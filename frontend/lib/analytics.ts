import prisma from "@/prisma/connection";

export type TimeRange = "yearly" | "monthly" | "weekly" | "daily";

export const isTimeRange = (value: unknown): value is TimeRange =>
  value === "yearly" ||
  value === "monthly" ||
  value === "weekly" ||
  value === "daily";

export type StatMetric = {
  value: number;
  percentageChange: number;
};

export type AnalyticsStats = {
  uploads: StatMetric;
  downloads: StatMetric;
  saves: StatMetric;
  profileVisits: StatMetric;
};

export type ChartPoint = {
  label: string;
  downloads: number;
};

export type RecentActivity = {
  id: string;
  title: string;
  authorName: string;
  timeAgo: string;
};

export type AnalyticsPayload = {
  stats: AnalyticsStats;
  chartData: ChartPoint[];
  recentActivities: RecentActivity[];
};

const pctChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
};

export function formatTimeAgo(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  const diffHr = Math.floor(diffMin / 60);
  return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
}

type BucketPlan = {
  start: Date;
  buckets: { key: string; label: string }[];
  keyFor: (d: Date) => string;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function planBuckets(now: Date, range: TimeRange): BucketPlan {
  if (range === "daily") {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const buckets = Array.from({ length: 24 }, (_, h) => ({
      key: String(h),
      label: String(h),
    }));
    return { start, buckets, keyFor: (d) => String(d.getHours()) };
  }
  if (range === "weekly") {
    const start = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    start.setHours(0, 0, 0, 0);
    const buckets = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
      const label = WEEKDAYS[date.getDay()];
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      return { key, label };
    });
    return {
      start,
      buckets,
      keyFor: (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
    };
  }
  if (range === "monthly") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    const buckets = Array.from({ length: daysInMonth }, (_, i) => ({
      key: String(i + 1),
      label: String(i + 1),
    }));
    return { start, buckets, keyFor: (d) => String(d.getDate()) };
  }
  const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const buckets = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: MONTHS_SHORT[date.getMonth()],
    };
  });
  return {
    start,
    buckets,
    keyFor: (d) => `${d.getFullYear()}-${d.getMonth()}`,
  };
}

export async function getAnalytics(
  userId: string,
  timeRange: TimeRange = "yearly",
): Promise<AnalyticsPayload> {
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOfRecentWindow = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const plan = planBuckets(now, timeRange);

  const [
    uploadsTotal,
    downloadsAggregate,
    chartRecords,
    uploadsThisMonth,
    uploadsLastMonth,
    downloadsThisMonth,
    downloadsLastMonth,
    savesTotal,
    savesThisMonth,
    savesLastMonth,
    profileVisitsTotal,
    profileVisitsThisMonth,
    profileVisitsLastMonth,
    recentDocs,
  ] = await Promise.all([
    prisma.document.count({ where: { authorId: userId } }),
    prisma.document.aggregate({
      where: { authorId: userId },
      _sum: { downloads: true },
    }),
    prisma.downloadRecord.findMany({
      where: {
        document: { authorId: userId },
        createdAt: { gte: plan.start },
      },
      select: { createdAt: true },
    }),
    prisma.document.count({
      where: { authorId: userId, createdAt: { gte: startOfThisMonth } },
    }),
    prisma.document.count({
      where: {
        authorId: userId,
        createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
      },
    }),
    prisma.downloadRecord.count({
      where: {
        document: { authorId: userId },
        createdAt: { gte: startOfThisMonth },
      },
    }),
    prisma.downloadRecord.count({
      where: {
        document: { authorId: userId },
        createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
      },
    }),
    prisma.save.count({ where: { document: { authorId: userId } } }),
    prisma.save.count({
      where: {
        document: { authorId: userId },
        createdAt: { gte: startOfThisMonth },
      },
    }),
    prisma.save.count({
      where: {
        document: { authorId: userId },
        createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
      },
    }),
    prisma.profileVisit.count({ where: { profileOwnerId: userId } }),
    prisma.profileVisit.count({
      where: { profileOwnerId: userId, createdAt: { gte: startOfThisMonth } },
    }),
    prisma.profileVisit.count({
      where: {
        profileOwnerId: userId,
        createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
      },
    }),
    prisma.document.findMany({
      where: {
        createdAt: { gte: startOfRecentWindow },
        authorId: { not: userId },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        author: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
  ]);

  const bucketMap = new Map<string, ChartPoint>();
  for (const b of plan.buckets) {
    bucketMap.set(b.key, { label: b.label, downloads: 0 });
  }
  for (const record of chartRecords) {
    const bucket = bucketMap.get(plan.keyFor(new Date(record.createdAt)));
    if (bucket) bucket.downloads++;
  }
  const chartData = plan.buckets.map((b) => bucketMap.get(b.key)!);

  const recentActivities: RecentActivity[] = recentDocs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    authorName: doc.author.name!,
    timeAgo: formatTimeAgo(doc.createdAt),
  }));

  return {
    stats: {
      uploads: {
        value: uploadsTotal,
        percentageChange: pctChange(uploadsThisMonth, uploadsLastMonth),
      },
      downloads: {
        value: downloadsAggregate._sum.downloads ?? 0,
        percentageChange: pctChange(downloadsThisMonth, downloadsLastMonth),
      },
      saves: {
        value: savesTotal,
        percentageChange: pctChange(savesThisMonth, savesLastMonth),
      },
      profileVisits: {
        value: profileVisitsTotal,
        percentageChange: pctChange(
          profileVisitsThisMonth,
          profileVisitsLastMonth,
        ),
      },
    },
    chartData,
    recentActivities,
  };
}

export async function recordProfileVisit(
  visitorId: string,
  profileOwnerId: string,
): Promise<void> {
  if (visitorId === profileOwnerId) return;

  const since = new Date(Date.now() - 30 * 60 * 1000);
  const recent = await prisma.profileVisit.findFirst({
    where: {
      profileOwnerId,
      visitorId,
      createdAt: { gte: since },
    },
    select: { id: true },
  });
  if (recent) return;

  await prisma.profileVisit.create({
    data: { profileOwnerId, visitorId },
  });
}

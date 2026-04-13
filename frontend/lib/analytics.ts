import prisma from "@/prisma/connection";

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

export type MonthlyDownload = {
  month: string;
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
  monthlyDownloads: MonthlyDownload[];
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

const monthKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;
const monthLabel = (d: Date) =>
  d.toLocaleString("en-US", { month: "short", year: "numeric" });

export async function getAnalytics(userId: string): Promise<AnalyticsPayload> {
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOf12MonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const startOfRecentWindow = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const [
    uploadsAggregate,
    downloadsSum,
    monthlyDownloadRecords,
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
        createdAt: { gte: startOf12MonthsAgo },
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

  const buckets = new Map<string, { month: string; downloads: number }>();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.set(monthKey(date), { month: monthLabel(date), downloads: 0 });
  }
  for (const record of monthlyDownloadRecords) {
    const bucket = buckets.get(monthKey(new Date(record.createdAt)));
    if (bucket) bucket.downloads++;
  }
  const monthlyDownloads = Array.from(buckets.values());

  const recentActivities: RecentActivity[] = recentDocs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    authorName: doc.author.name!,
    timeAgo: formatTimeAgo(doc.createdAt),
  }));

  return {
    stats: {
      uploads: {
        value: uploadsAggregate,
        percentageChange: pctChange(uploadsThisMonth, uploadsLastMonth),
      },
      downloads: {
        value: downloadsSum._sum.downloads ?? 0,
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
    monthlyDownloads,
    recentActivities,
  };
}

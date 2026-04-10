const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatTimeAgo(dateString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );

  if (seconds < MINUTE) return "just now";
  if (seconds < HOUR) return rtf.format(-Math.floor(seconds / MINUTE), "minute");
  if (seconds < DAY) return rtf.format(-Math.floor(seconds / HOUR), "hour");
  if (seconds < DAY * 7) return rtf.format(-Math.floor(seconds / DAY), "day");

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

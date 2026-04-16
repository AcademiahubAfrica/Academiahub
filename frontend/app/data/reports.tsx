import type { ReportReason } from "@prisma/client";

export const reportReasons: { value: ReportReason; label: string }[] = [
  { value: "PLAGIARISM", label: "Plagiarism or stolen content" },
  { value: "MISLEADING", label: "Incorrect or misleading information" },
  { value: "COPYRIGHT", label: "Copyright violation" },
  { value: "INAPPROPRIATE", label: "Inappropriate content" },
  { value: "SPAM", label: "Spam or irrelevant" },
];

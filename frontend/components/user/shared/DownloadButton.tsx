"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  documentId: string;
  fileUrl: string;
  fileName: string;
  onDownload?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const DownloadButton = ({
  documentId,
  fileUrl,
  fileName,
  onDownload,
  className,
  children,
}: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (loading) return;
    setLoading(true);

    try {
      const [, response] = await Promise.all([
        fetch(`/api/documents/${documentId}/download`, { method: "POST" }),
        fetch(fileUrl),
      ]);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onDownload?.();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="default"
      size="lg"
      className={className ?? "w-full rounded h-7.5 md:h-11 flex items-center justify-center text-[7.77px] font-medium md:text-[16px] leading-[130%]"}
      onClick={handleDownload}
      disabled={loading}
    >
      {children ?? "Download Publication"}
    </Button>
  );
};

export default DownloadButton;

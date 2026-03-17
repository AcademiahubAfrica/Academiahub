"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  documentId: string;
  fileUrl: string;
  fileName: string;
}

const DownloadButton = ({
  documentId,
  fileUrl,
  fileName,
}: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (loading) return;
    setLoading(true);

    try {
      await fetch(`/api/documents/${documentId}/download`, {
        method: "POST",
      });

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
      className="w-full rounded md:h-9 h-5.25 flex items-center justify-center text-[7.77px] font-medium md:text-[16px] leading-[130%]"
      onClick={handleDownload}
      disabled={loading}
    >
      Download Publication
    </Button>
  );
};

export default DownloadButton;

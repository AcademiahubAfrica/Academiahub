"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { reportReasons } from "@/app/data/reports";
import type { ReportReason } from "@prisma/client";

interface ReportFormProps {
  documentId: string;
  onClose: () => void;
}

export default function ReportForm({ documentId, onClose }: ReportFormProps) {
  const [selected, setSelected] = useState<Set<ReportReason>>(new Set());
  const [otherChecked, setOtherChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    (selected.size > 0 || (otherChecked && description.trim().length > 0)) &&
    !isSubmitting;

  function toggleReason(reason: ReportReason) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(reason)) {
        next.delete(reason);
      } else {
        next.add(reason);
      }
      return next;
    });
  }

  async function handleSubmit() {
    setError(null);
    setIsSubmitting(true);

    const reasons: ReportReason[] = [...selected];
    if (otherChecked) {
      reasons.push("OTHER");
    }

    try {
      const res = await fetch(`/api/documents/${documentId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: reasons,
          description: otherChecked ? description.trim() : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
    } catch {
      setError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-73.25 p-4.75 flex flex-col items-center">
        <h3 className="font-semibold text-center mb-3.75 text-lg">
          Report submitted
        </h3>
        <p className="text-center mb-3 text-sm">
          Thanks for your feedback. We will review this publication and take
          appropriate action.
        </p>
        <Button className="w-full" onClick={onClose} variant="default">
          Done
        </Button>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-6.5 pt-6 px-6">
        <h2 id="report-title" className="text-lg font-semibold mb-2">
          Report this publication
        </h2>
        <p id="report-desc" className="text-sm leading-snug">
          Tell us why you are reporting this content. Your feedback helps keep
          the platform safe.
        </p>
      </header>

      <fieldset>
        <legend className="sr-only">Select report reasons</legend>
        <ul role="list">
          {reportReasons.map((report) => (
            <li
              key={report.value}
              className="flex justify-between items-center border-b-2 border-b-gray-300 px-6 pb-3 mt-3"
            >
              <label
                htmlFor={`reason-${report.value}`}
                className="font-medium cursor-pointer flex-1"
              >
                {report.label}
              </label>
              <input
                id={`reason-${report.value}`}
                type="checkbox"
                checked={selected.has(report.value)}
                onChange={() => toggleReason(report.value)}
                className="size-4 cursor-pointer accent-primary"
              />
            </li>
          ))}

          <li className="border-b-2 border-b-gray-300 px-6 pb-3 mt-3.75">
            <div className="flex justify-between items-center">
              <label
                htmlFor="reason-OTHER"
                className="font-medium cursor-pointer flex-1"
              >
                Other
              </label>
              <input
                id="reason-OTHER"
                type="checkbox"
                checked={otherChecked}
                onChange={() => setOtherChecked((prev) => !prev)}
                className="size-4 cursor-pointer accent-primary"
              />
            </div>
            {otherChecked && (
              <textarea
                aria-label="Describe the issue"
                placeholder="Type here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-2 resize-none focus-within:outline-0 text-sm"
                rows={3}
              />
            )}
          </li>
        </ul>
      </fieldset>

      {error && (
        <p role="alert" className="text-red-600 text-sm px-6 mt-2">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2.5 my-6.5 px-6.5">
        <Button
          variant="outline"
          onClick={onClose}
          className="border-primary-500"
        >
          Close
        </Button>
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

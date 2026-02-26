"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error);
  return (
    <div className="p-6 text-center">
      <h2 className="text-lg font-semibold mb-2">Something went wrong.</h2>
      <p className="text-sm text-gray-500 mb-4">{error.message}</p>
      <Button
        onClick={() => {
          console.log("retrying");
          reset();
        }}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Try again
      </Button>
    </div>
  );
}

"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ResetSuccessContent = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md w-full">

        {/* Icon */}
        <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>

        {/* Title */}
        <h1 className="heading-1 font-semibold text-foreground mb-2">
          Password updated successfully
        </h1>

        {/* Subtitle */}
        <p className="body-text text-muted-foreground mb-8">
          Your password has been reset successfully. You can now sign in using your new password.
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-muted text-muted-foreground py-3 rounded-xl border border-input hover:bg-background"
        >
          Back to login
        </button>
      </div>
    </div>
  );
};

export default ResetSuccessContent;
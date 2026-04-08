"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const CheckEmailContent = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">

      <div className="text-center max-w-md w-full">

        {/* Icon */}
        <div className="flex justify-center mb-6">
            <Mail className="h-16 w-16 text-primary" />
        </div>

        {/* Title */}
        <h1 className="heading-1 font-semibold text-foreground mb-4">
          Check your email
        </h1>

        {/* Subtitle */}
        <p className="body-text text-muted-foreground mb-8">
          If an account exists for this email, we’ve sent a password reset link.
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-muted text-muted-foreground py-3 rounded-xl border border-input hover:bg-background "
        >
          Back to login
        </button>
      </div>

      {/* Footer */}
      <p className="label text-foreground mt-16">
        © 2026 Academia Hub Africa. All rights reserved.
      </p>
    </div>
  );
};

export default CheckEmailContent;
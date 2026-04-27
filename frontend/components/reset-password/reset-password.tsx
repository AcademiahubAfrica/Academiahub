"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, Lock, CheckCircle2, AlertTriangle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import ResetYourPasswordImg from "@/public/assets/images/reset-password.png";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordRequirement {
  text: string;
  met: boolean;
}

const checkPasswordRequirements = (
  password: string,
): PasswordRequirement[] => [
  {
    text: "Must be 8 characters long",
    met: password.length >= 8,
  },
  {
    text: "Must have at least 1 uppercase and 1 lowercase",
    met: /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
  {
    text: "Must have at least one special symbol",
    met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const requirements = checkPasswordRequirements(formData.newPassword);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md w-full">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
          <h1 className="heading-1 font-semibold text-foreground mb-2">
            Invalid reset link
          </h1>
          <p className="body-text text-muted-foreground mb-8">
            This password reset link is missing required information. Please
            request a new link.
          </p>
          <button
            onClick={() => router.push("/reset-your-password")}
            className="w-full bg-primary hover:bg-primary/90 text-background py-3 rounded-xl transition-colors"
          >
            Request a new link
          </button>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (!requirements.every((req) => req.met)) {
      newErrors.newPassword = "Password does not meet all requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: formData.newPassword }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          toast.error(data.message ?? "Could not reset password.");
          return;
        }

        router.push("/password-reset-success");
      } catch {
        toast.error("Network error. Please try again.");
      }
    });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image (hidden on mobile, sticky on desktop) */}
      <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-0 lg:h-screen">
        <div className="h-full flex items-end relative">
          <Image
            src={ResetYourPasswordImg}
            alt="Security"
            fill
            className="object-cover"
            priority
            placeholder="blur"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div
              className="flex justify-center mb-3 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                src="/assets/images/academialogo.png"
                alt="AcademiaHub Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <h1 className="heading-1 font-semibold text-foreground mb-2">
              Reset Password
            </h1>
            <p className="body-text text-muted-foreground">
              Kindly enter your new password
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block body-text font-medium text-foreground mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                    errors.newPassword ? "border-destructive" : "border-input"
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="label text-destructive mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block body-text font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                    errors.confirmPassword
                      ? "border-destructive"
                      : "border-input"
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="label text-destructive mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="space-y-2 pt-2">
              {requirements.map((req) => (
                <div key={req.text} className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-5 w-5 ${
                      req.met ? "text-green-600" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`body-text ${
                      req.met ? "text-green-600" : "text-muted-foreground"
                    }`}
                  >
                    {req.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl transition-colors mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Resetting…" : "Reset Password"}
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center body-text text-muted-foreground mt-6">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordContent;

"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

const ResetYourPasswordContent = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Reset link sent to:", formData.email);
      toast.success("Password reset link sent!");
    }
  };

  const handleChange = (value: string) => {
    setFormData({ email: value });
    if (errors.email) {
      setErrors({ email: undefined });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-muted">
      
      {/* Left Image */}
      <div className="hidden lg:block lg:w-1/2 lg:h-screen relative">
        <Image
          src="/assets/images/reset-password.png"
          alt="Reset password"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-10 bg-background">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="text-center mb-10">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mx-auto mb-6 block"
            >
              <Image
                src="/assets/images/academialogo.png"
                alt="AcademiaHub Logo"
                width={56}
                height={56}
                className="object-contain mx-auto"
              />
            </button>

            <h1 className="heading-1 font-semibold text-foreground mb-2">
              Reset your password
            </h1>

            <p className="body-text text-muted-foreground">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">

            {/* Email Field */}
            <div>
              <label className="block body-text text-foreground mb-2">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                    errors.email ? "border-destructive" : "border-input"
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
              </div>

              {errors.email && (
                <p className="label text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {/* Primary Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-background  py-3 rounded-xl transition-colors"
            >
              Send reset link
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full bg-muted text-dark  py-3 rounded-xl border border-input hover:bg-background"
            >
              Back to login
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetYourPasswordContent;
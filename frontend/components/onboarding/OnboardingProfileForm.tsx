"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country, State } from "country-state-city";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  onboardingProfileSchema,
  OnboardingProfileSchemaType,
} from "@/lib/schemas/settingsSchema";

interface OnboardingProfileFormProps {
  userName: string;
}

const inputClassName =
  "bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow";

export default function OnboardingProfileForm({
  userName,
}: OnboardingProfileFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () =>
      selectedCountryCode
        ? State.getStatesOfCountry(selectedCountryCode)
        : [],
    [selectedCountryCode],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OnboardingProfileSchemaType>({
    resolver: zodResolver(onboardingProfileSchema),
    defaultValues: {
      name: userName,
      institution: "",
      department: "",
      state: "",
      country: "",
    },
  });

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    setSelectedStateCode("");
    const country = countries.find((c) => c.isoCode === countryCode);
    setValue("country", country?.name ?? "", { shouldValidate: true });
    setValue("state", "", { shouldValidate: true });
  };

  const handleStateChange = (stateCode: string) => {
    setSelectedStateCode(stateCode);
    const state = states.find((s) => s.isoCode === stateCode);
    setValue("state", state?.name ?? "", { shouldValidate: true });
  };

  const onSubmit = async (data: OnboardingProfileSchemaType) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save profile");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Left content */}
      <div className="flex-1 flex flex-col p-6 sm:p-10 lg:pt-12 lg:pl-22.5 lg:pr-16 lg:pb-10 relative">
        {/* Watermark background */}
        <div className="absolute pointer-events-none w-63.25 h-91 bottom-0 -left-6.25">
          <Image
            src="/assets/images/onboarding/watermark-icon.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 flex flex-col flex-1">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/assets/images/onboarding/onboarding-logo.svg"
              alt="AcademiaHub — Knowledge, Collaboration and Growth."
              width={284}
              height={69}
              className="w-auto"
            />
          </div>

          {/* Form */}
          <div className="max-w-lg">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-8">
              Create your profile
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <fieldset disabled={isSubmitting}>
                <FieldGroup>
                  {/* Full Name */}
                  <Field>
                    <FieldLabel htmlFor="fullName" className="font-semibold text-sm">
                      Full name
                    </FieldLabel>
                    <Input
                      id="fullName"
                      className={inputClassName}
                      placeholder="Full name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <FieldError>{errors.name.message}</FieldError>
                    )}
                  </Field>

                  {/* Institution */}
                  <Field>
                    <FieldLabel htmlFor="institution" className="font-semibold text-sm">
                      Institution
                    </FieldLabel>
                    <Input
                      id="institution"
                      className={inputClassName}
                      placeholder="Enter your institution"
                      {...register("institution")}
                    />
                    {errors.institution && (
                      <FieldError>{errors.institution.message}</FieldError>
                    )}
                  </Field>

                  {/* Department */}
                  <Field>
                    <FieldLabel htmlFor="department" className="font-semibold text-sm">
                      Department
                    </FieldLabel>
                    <Input
                      id="department"
                      className={inputClassName}
                      placeholder="Department"
                      {...register("department")}
                    />
                    {errors.department && (
                      <FieldError>{errors.department.message}</FieldError>
                    )}
                  </Field>

                  {/* Location */}
                  <Field>
                    <FieldLabel className="font-semibold text-sm">
                      Location
                    </FieldLabel>
                    <div className="flex gap-4">
                      <div className="flex-1 space-y-1">
                        <Select
                          value={selectedCountryCode}
                          onValueChange={handleCountryChange}
                        >
                          <SelectTrigger className={`${inputClassName} w-full`}>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {countries.map((country) => (
                              <SelectItem
                                key={country.isoCode}
                                value={country.isoCode}
                              >
                                {country.flag} {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.country && (
                          <FieldError>{errors.country.message}</FieldError>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <Select
                          value={selectedStateCode}
                          onValueChange={handleStateChange}
                          disabled={!selectedCountryCode || states.length === 0}
                        >
                          <SelectTrigger className={`${inputClassName} w-full`}>
                            <SelectValue
                              placeholder={
                                states.length === 0
                                  ? "No states available"
                                  : "Select state"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {states.map((state) => (
                              <SelectItem
                                key={state.isoCode}
                                value={state.isoCode}
                              >
                                {state.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && (
                          <FieldError>{errors.state.message}</FieldError>
                        )}
                      </div>
                    </div>
                  </Field>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg mt-2"
                  >
                    {isSubmitting ? "Saving..." : "Complete registration"}
                  </Button>
                </FieldGroup>
              </fieldset>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-900 mt-auto relative z-10">
          &copy; 2026 Academia Hub Africa. All rights reserved.
        </p>
      </div>

      {/* Right image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/assets/images/signup-image.png"
          alt="Create your profile"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

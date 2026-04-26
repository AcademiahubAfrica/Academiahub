"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country, State, ICountry, IState } from "country-state-city";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials } from "@/lib/messaging/utils";
import { profileSchema, ProfileSchemaType } from "@/lib/schemas/settingsSchema";
import { Bio } from "@/app/_types/author";
import { useHashHighlight } from "@/lib/hooks/useHashHighlight";

interface ProfileData {
  name: string;
  image: string | null;
  bio: Bio | null;
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

function findCountryByName(name: string): ICountry | undefined {
  if (!name) return undefined;
  const lower = name.toLowerCase();
  return Country.getAllCountries().find((c) => c.name.toLowerCase() === lower);
}

function findStateByName(
  name: string,
  countryCode: string,
): IState | undefined {
  if (!name || !countryCode) return undefined;
  const lower = name.toLowerCase();
  return State.getStatesOfCountry(countryCode).find(
    (s) => s.name.toLowerCase() === lower,
  );
}

const inputClassName =
  "bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow";

const EditProfileForm = ({ profileData }: { profileData: ProfileData }) => {
  useHashHighlight();

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resolve initial country/state codes from names
  const initialCountry = findCountryByName(profileData.bio?.country ?? "");
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    initialCountry?.isoCode ?? "",
  );

  const initialState = findStateByName(
    profileData.bio?.state ?? "",
    initialCountry?.isoCode ?? "",
  );
  const [selectedStateCode, setSelectedStateCode] = useState(
    initialState?.isoCode ?? "",
  );

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () =>
      selectedCountryCode ? State.getStatesOfCountry(selectedCountryCode) : [],
    [selectedCountryCode],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profileData.name,
      institution: profileData.bio?.institution ?? "",
      department: profileData.bio?.department ?? "",
      state: profileData.bio?.state ?? "",
      country: profileData.bio?.country ?? "",
      aboutMe: profileData.bio?.aboutMe ?? "",
    },
  });

  const avatarSrc = imagePreview ?? profileData.image ?? undefined;
  const initials = getInitials(profileData.name);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be less than 2MB");
      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      e.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    setSelectedStateCode("");
    const country = countries.find((c) => c.isoCode === countryCode);
    setValue("country", country?.name ?? "");
    setValue("state", "");
  };

  const handleStateChange = (stateCode: string) => {
    setSelectedStateCode(stateCode);
    const state = states.find((s) => s.isoCode === stateCode);
    setValue("state", state?.name ?? "");
  };

  const onSubmit = async (data: ProfileSchemaType) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update profile");
      }

      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="flex items-center text-black hover:bg-[#F5F5F5] hover:text-black/85 p-2.5 rounded-[12px] bg-white mb-6"
        onClick={() => router.back()}
      >
        <Image
          src={"/assets/images/user/back.svg"}
          alt="back"
          width={18}
          height={17}
        />
        Back
      </Button>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting}>
          <FieldLegend className="text-xl font-semibold leading-4.5 tracking-normal mb-6">
            Profile Information
          </FieldLegend>

          <FieldGroup>
            {/* Avatar */}
            <Field>
              <div className="flex items-center gap-4">
                <Avatar className="border-[3px] border-white h-20 w-20 lg:w-25 lg:h-25 shadow-md">
                  <AvatarImage
                    src={avatarSrc}
                    alt={profileData.name || "avatar"}
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <FieldLabel
                  id="profilePicture"
                  className="px-4 py-2.5 rounded-4xl cursor-pointer hover:bg-primary hover:text-white duration-150 w-fit transition-all text-sm leading-4.5 tracking-normal border"
                  htmlFor="profilePicture"
                >
                  Change profile picture
                </FieldLabel>
                <input
                  className="hidden"
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
            </Field>

            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor="fullName" className="font-semibold">
                Full name
              </FieldLabel>
              <Input
                id="fullName"
                className={inputClassName}
                placeholder="Enter your full name"
                {...register("name")}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            {/* Institution */}
            <Field>
              <FieldLabel htmlFor="institution" className="font-semibold">
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
              <FieldLabel htmlFor="department" className="font-semibold">
                Department
              </FieldLabel>
              <Input
                id="department"
                className={inputClassName}
                placeholder="Enter your department"
                {...register("department")}
              />
              {errors.department && (
                <FieldError>{errors.department.message}</FieldError>
              )}
            </Field>

            {/* Location */}
            <Field>
              <FieldLabel className="font-semibold">Location</FieldLabel>
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
                        <SelectItem key={state.isoCode} value={state.isoCode}>
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

            {/* About */}
            <Field>
              <FieldLabel htmlFor="about" className="font-semibold">
                About
              </FieldLabel>
              <Textarea
                id="about"
                className={`${inputClassName} min-h-24 resize-none`}
                placeholder="Tell us about yourself"
                {...register("aboutMe")}
              />
              {errors.aboutMe && (
                <FieldError>{errors.aboutMe.message}</FieldError>
              )}
            </Field>

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="md:w-78.25"
              >
                Save changes
              </Button>
            </div>
          </FieldGroup>
        </fieldset>
      </form>
    </div>
  );
};

export default EditProfileForm;

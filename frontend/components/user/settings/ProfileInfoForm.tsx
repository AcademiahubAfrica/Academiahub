"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/messaging/utils";
import { Bio } from "@/app/_types/author";
import {
  fetchSignedParams,
  uploadToCloudinaryWithProgress,
} from "@/lib/cloudinary/upload";

interface ProfileData {
  name: string;
  image: string | null;
  bio: Bio | null;
}

const MAX_AVATAR_BYTES = 4 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

const inputClass =
  "bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow";

const emptyBio: Bio = {
  institution: "",
  department: "",
  aboutMe: "",
  state: "",
  country: "",
};

const ProfileInfoForm = ({ profileData }: { profileData: ProfileData }) => {
  const router = useRouter();
  const { update } = useSession();

  const [name, setName] = useState(profileData.name);
  const [bio, setBio] = useState<Bio>(profileData.bio ?? emptyBio);
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "uploading" | "saving">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isBusy = phase !== "idle";
  const initialBio = profileData.bio ?? emptyBio;
  const isDirty =
    stagedFile !== null ||
    name.trim() !== profileData.name ||
    bio.institution !== initialBio.institution ||
    bio.department !== initialBio.department ||
    bio.aboutMe !== initialBio.aboutMe ||
    bio.state !== initialBio.state ||
    bio.country !== initialBio.country;

  const avatarSrc = previewUrl ?? profileData.image ?? undefined;
  const initials = getInitials(name);

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const updateBio = (field: keyof Bio, value: string) => {
    setBio((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      toast.error("Only JPEG, PNG, or WebP images are allowed");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("Image must be 4 MB or smaller");
      e.target.value = "";
      return;
    }

    setStagedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty || isBusy) return;

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    let uploadedUrl: string | undefined;
    let stage: "uploading" | "saving" = "uploading";

    try {
      if (stagedFile) {
        setPhase("uploading");
        setProgress(0);
        const sign = await fetchSignedParams("avatar");
        const uploaded = await uploadToCloudinaryWithProgress(
          stagedFile,
          sign,
          setProgress,
        );
        uploadedUrl =
          uploaded.eager?.[0]?.secure_url ?? uploaded.secure_url;
      }

      stage = "saving";
      setPhase("saving");
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          institution: bio.institution,
          department: bio.department,
          aboutMe: bio.aboutMe,
          state: bio.state,
          country: bio.country,
          ...(uploadedUrl !== undefined ? { image: uploadedUrl } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save profile");
      }

      if (uploadedUrl !== undefined) {
        await update({ image: uploadedUrl });
      }

      toast.success("Profile updated");
      setStagedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(
        stage === "uploading" ? `Couldn't upload image: ${message}` : message,
      );
    } finally {
      setPhase("idle");
      setProgress(0);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <fieldset disabled={isBusy}>
        <FieldLegend>Profile Information</FieldLegend>

        <FieldGroup>
          <Field>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="border-[3px] border-white h-10 w-10 lg:w-25 lg:h-25">
                  <AvatarImage src={avatarSrc} alt={name || "avatar"} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                {phase === "uploading" ? (
                  <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/30 rounded-b-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-[width] duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                ) : null}
              </div>
              <FieldLabel
                className="px-4 py-2.5 rounded-4xl cursor-pointer hover:bg-primary hover:text-white duration-150 w-fit transition-all text-sm leading-4.5 tracking-normal border"
                htmlFor="file"
              >
                Change Profile Picture
              </FieldLabel>
              <input
                ref={fileInputRef}
                className="hidden"
                id="file"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
              />
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="institution">Institution</FieldLabel>
            <Input
              id="institution"
              className={inputClass}
              value={bio.institution}
              onChange={(e) => updateBio("institution", e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="department">Department</FieldLabel>
            <Input
              id="department"
              className={inputClass}
              value={bio.department}
              onChange={(e) => updateBio("department", e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="state">State</FieldLabel>
            <Input
              id="state"
              className={inputClass}
              value={bio.state}
              onChange={(e) => updateBio("state", e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Input
              id="country"
              className={inputClass}
              value={bio.country}
              onChange={(e) => updateBio("country", e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="about">About</FieldLabel>
            <Input
              id="about"
              className={inputClass}
              value={bio.aboutMe}
              onChange={(e) => updateBio("aboutMe", e.target.value)}
            />
          </Field>

          <div>
            <Button type="submit" disabled={!isDirty || isBusy}>
              {phase === "uploading"
                ? `Uploading ${progress}%`
                : phase === "saving"
                  ? "Saving..."
                  : "Save Changes"}
            </Button>
          </div>
        </FieldGroup>
      </fieldset>
    </form>
  );
};

export default ProfileInfoForm;

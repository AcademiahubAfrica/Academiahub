"use client";

import { useState } from "react";
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

interface ProfileData {
  name: string;
  image: string | null;
  bio: Bio | null;
}

const ProfileInfoForm = ({ profileData }: { profileData: ProfileData }) => {
  const [name, setName] = useState(profileData.name);
  const [bio, setBio] = useState<Bio>(
    profileData.bio ?? {
      institution: "",
      department: "",
      academicLevel: "",
      aboutMe: "",
      state: "",
      country: "",
    },
  );

  const avatarSrc = profileData.image || undefined;
  const initials = getInitials(name);

  const updateBio = (field: keyof Bio, value: string) => {
    setBio((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form className="space-y-3">
      <fieldset>
        <FieldLegend>Profile Information</FieldLegend>

        <FieldGroup>
          <Field>
            <div className="flex items-center gap-4">
              <Avatar className="border-[3px]  border-white h-10 w-10 lg:w-25 lg:h-25 ">
                <AvatarImage
                  className=""
                  src={avatarSrc}
                  alt={name || "avatar"}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <FieldLabel
                className="px-4 py-2.5 rounded-4xl cursor-pointer hover:bg-primary hover:text-white duration-150 w-fit transition-all text-sm leading-4.5 tracking-normal border"
                htmlFor="file"
              >
                Change Profile Picture
              </FieldLabel>
              <input className="hidden" id="file" type="file" />
            </div>
          </Field>
          {/* full name */}
          <Field className="">
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          {/* Institution */}
          <Field className="">
            <FieldLabel htmlFor="institution">Institution</FieldLabel>
            <Input
              id="institution"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              value={bio.institution}
              onChange={(e) => updateBio("institution", e.target.value)}
            />
          </Field>
          {/* Department */}
          <Field className="">
            <FieldLabel htmlFor="department">Department</FieldLabel>
            <Input
              id="department"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              value={bio.department}
              onChange={(e) => updateBio("department", e.target.value)}
            />
          </Field>

          {/* State */}
          <Field className="">
            <FieldLabel htmlFor="state">State</FieldLabel>
            <Input
              id="state"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              value={bio.state}
              onChange={(e) => updateBio("state", e.target.value)}
            />
          </Field>
          {/* Country */}
          <Field className="">
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Input
              id="country"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              value={bio.country}
              onChange={(e) => updateBio("country", e.target.value)}
            />
          </Field>
          {/* About */}
          <Field className="">
            <FieldLabel htmlFor="about">About</FieldLabel>
            <Input
              id="about"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              value={bio.aboutMe}
              onChange={(e) => updateBio("aboutMe", e.target.value)}
            />
          </Field>

          <div>
            <Button> Save Changes</Button>
          </div>
        </FieldGroup>
      </fieldset>
    </form>
  );
};

export default ProfileInfoForm;

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useSession } from "next-auth/react";
const ProfileInfoForm = () => {
  // const { data: session, status } = useSession();

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
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>OC</AvatarFallback>
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
              defaultValue={"ochife ogechukwu"}
            />
          </Field>

          {/* Institution */}
          <Field className="">
            <FieldLabel htmlFor="institution">Institution</FieldLabel>
            <Input
              id="institution"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              defaultValue={"University of Lagos"}
            />
          </Field>
          {/* Department */}
          <Field className="">
            <FieldLabel htmlFor="department">Department</FieldLabel>
            <Input
              id="department"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              defaultValue={"Computer Science"}
            />
          </Field>

          {/* Location */}
          <Field className="">
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              id="location"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              defaultValue={"Lagos State, Nigeria"}
            />
          </Field>
          {/* About */}
          <Field className="">
            <FieldLabel htmlFor="about">About</FieldLabel>
            <Input
              id="about"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
              defaultValue={
                "e.g Analysis of Renewable Energy Solutions in Nigeria."
              }
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

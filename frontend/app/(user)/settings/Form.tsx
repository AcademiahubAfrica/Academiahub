import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Form = () => {
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
              <Button type="button" className="px-2" variant={"outline2"}>
                <FieldLabel className="" htmlFor="file">
                  Change Profile Picture
                </FieldLabel>
              </Button>
              <input className="hidden" id="file" type="file" />
            </div>
          </Field>
          {/* full name */}
          <Field className="">
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              className="bg-[#FAFAFA]"
              defaultValue={"ochife ogechukwu"}
            />
          </Field>

          {/* Institution */}
          <Field className="">
            <FieldLabel htmlFor="institution">Institution</FieldLabel>
            <Input
              id="institution"
              className="bg-[#FAFAFA]"
              defaultValue={"University of Lagos"}
            />
          </Field>
          {/* Department */}
          <Field className="">
            <FieldLabel htmlFor="department">Department</FieldLabel>
            <Input
              id="department"
              className="bg-[#FAFAFA]"
              defaultValue={"Computer Science"}
            />
          </Field>

          {/* Location */}
          <Field className="">
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              id="location"
              className="bg-[#FAFAFA]"
              defaultValue={"Lagos State, Nigeria"}
            />
          </Field>
          {/* About */}
          <Field className="">
            <FieldLabel htmlFor="about">About</FieldLabel>
            <Input
              id="about"
              className="bg-[#FAFAFA]"
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

export default Form;

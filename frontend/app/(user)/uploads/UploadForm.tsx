"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldError,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { HiOutlineUpload } from "react-icons/hi";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { FaTimes } from "react-icons/fa";

// --------------------
//   ZOD SCHEMA
// --------------------
const formSchema = z.object({
  image: z
    .custom<File>()
    .refine((file) => file instanceof File, "Please upload an image"),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(1, "Please select a category"),
  institution: z.string().min(3, "Institution is required"),
  year: z.string().min(4, "Year is required"),
});

type FormValues = z.infer<typeof formSchema>;

const UploadForm = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const { register, resetField, handleSubmit, control, setValue, formState: { errors }, } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  // --------------------
  // IMAGE CHANGE HANDLER
  // --------------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Accept only one image
    setValue("image", file);

    // Preview
    const imgUrl = URL.createObjectURL(file);
    setPreview(imgUrl);
  };

  // --------------------
  // SUBMIT HANDLER
  // --------------------
  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <FieldSet className="lg:mt-10">
        <FieldLegend>Upload material</FieldLegend>
        <FieldDescription>
          Share your research, seminar papers, or academic projects with the
          community
        </FieldDescription>

        <FieldGroup>
          {/* IMAGE UPLOAD */}
          <Field>
            <FieldLabel htmlFor="image">Cover image / Thumbnail</FieldLabel>

            <div className="relative min-h-[158px] lg:min-h-[342px] border-dashed border-grey border rounded-lg flex items-center justify-center overflow-hidden">
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />

              {/* If preview exists show it */}
              {preview ? (
                <>
                  <FaTimes
                    className="absolute text-primary text-4xl cursor-pointer top-2 right-2 z-10"
                    onClick={() => {
                      resetField("image");
                      setPreview(null);
                    }}
                  />

                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <HiOutlineUpload size={32} />
                  <p>Click to upload cover image</p>
                  <small>PNG, JPEG up to 10MB</small>
                </div>
              )}
            </div>

            {errors.image && <FieldError>{errors.image.message}</FieldError>}
          </Field>

          {/* TITLE */}
          <Field>
            <FieldLabel htmlFor="title">
              Title <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              id="title"
              placeholder="e.g Analysis of Renewable Energy Solutions in Nigeria."
              {...register("title")}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          {/* DESCRIPTION */}
          <Field>
            <FieldLabel htmlFor="description">
              Abstract / Description <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              id="description"
              placeholder="Short abstract or summary"
              {...register("description")}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>

          {/* CATEGORY */}
          <Field>
            <FieldLabel htmlFor="category">
              Category <span className="text-red-500">*</span>
            </FieldLabel>

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="seminar">Seminar Paper</SelectItem>
                      <SelectItem value="project">
                        Final Year Project
                      </SelectItem>
                      <SelectItem value="analysis">Analysis</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <FieldError>{errors.category.message}</FieldError>
            )}
          </Field>

          {/* INSTITUTION & YEAR */}
          <div className="flex items-center gap-4 justify-between">
            <div className="basis-1/2">
              <Field>
                <FieldLabel htmlFor="institution">
                  Institution <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  id="institution"
                  placeholder="e.g University of Lagos"
                  {...register("institution")}
                />
                {errors.institution && (
                  <FieldError>{errors.institution.message}</FieldError>
                )}
              </Field>
            </div>

            <div className="basis-1/2">
              <Field>
                <FieldLabel htmlFor="year">
                  Year <span className="text-red-500">*</span>
                </FieldLabel>
                <Input id="year" placeholder="e.g 2025" {...register("year")} />
                {errors.year && <FieldError>{errors.year.message}</FieldError>}
              </Field>
            </div>
          </div>

          <Button type="submit">Upload</Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default UploadForm;

"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
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
import { z } from "zod";
import { FaTimes } from "react-icons/fa";
import { useUploadThing } from "@/lib/uploadthing/uploadthing";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

// --------------------
//   ZOD SCHEMA
// --------------------
const formSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => file instanceof File, "Please upload a PDF document")
    .refine(
      (file) => file instanceof File && file.type === "application/pdf",
      "Only PDF files are allowed",
    ),
  title: z.string().min(3, "Title is required"),
  description: z
    .string()
    .min(10, "Description is required")
    .max(1000, "Description is too long"),
  category: z.string().min(1, "Please select a category"),
  institution: z.string().min(3, "Institution is required"),
  year: z.string().min(4, "Year is required"),
});

type FormValues = z.infer<typeof formSchema>;

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    resetField,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const { startUpload } = useUploadThing("pdfUploader", {
    onUploadError: (error) => {
      setUploadError(error.message);
      setIsUploading(false);
    },
  });

  // --------------------
  // FILE CHANGE HANDLER
  // --------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);

    if (!file) return;

    if (file.type !== "application/pdf") {
      setUploadError("Only PDF files are allowed");
      return;
    }

    setValue("file", file);
    setSelectedFile(file);
  };

  // --------------------
  // SUBMIT HANDLER
  // --------------------
  const onSubmit = async (data: FormValues) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // Upload file to UploadThing
      const uploadResult = await startUpload([data.file]);

      if (!uploadResult || uploadResult.length === 0) {
        throw new Error("Upload failed. Please try again.");
      }

      const uploadedFile = uploadResult[0];

      // Create document record in database
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          category: data.category,
          institution: data.institution,
          year: data.year,
          fileUrl: uploadedFile.ufsUrl,
          fileKey: uploadedFile.key,
          fileName: uploadedFile.name,
          fileSize: uploadedFile.size,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save document");
      }

      // Success - redirect to uploads page or show success message
      router.push("/uploads?success=true");
      router.refresh();
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "An error occurred",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <FieldSet className="">
        <h4 className="hidden md:block">Upload material</h4>
        <FieldDescription className="text-grey max-sm:text-[10px]">
          Share your research, seminar papers, or academic projects with the
          community
        </FieldDescription>

        <FieldGroup>
          {/* PDF UPLOAD */}
          <Field>
            <FieldLabel htmlFor="file">Document (PDF)</FieldLabel>

            <div className="relative min-h-[158px] lg:min-h-[200px] border-dashed border-grey border rounded-lg flex items-center justify-center overflow-hidden">
              <Input
                id="file"
                type="file"
                accept=".pdf,application/pdf"
                className="absolute top-0 left-0 w-full h-full opacity-0  cursor-pointer"
                onChange={handleFileChange}
                disabled={isUploading}
              />

              {/* If file is selected show its info */}
              {selectedFile ? (
                <>
                  <FaTimes
                    className="absolute text-primary text-2xl cursor-pointer top-2 right-2 z-10"
                    onClick={() => {
                      resetField("file");
                      setSelectedFile(null);
                      setUploadError(null);
                    }}
                  />

                  <div className="flex flex-col items-center gap-2 text-center p-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        PDF
                      </span>
                    </div>
                    <p className="font-medium truncate max-w-[250px]">
                      {selectedFile.name}
                    </p>
                    <small className="text-grey">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </small>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <HiOutlineUpload size={32} />
                  <p>Click to upload PDF document</p>
                  <small>PDF up to 16MB</small>
                </div>
              )}
            </div>

            {errors.file && <FieldError>{errors.file.message}</FieldError>}
            {uploadError && <FieldError>{uploadError}</FieldError>}
          </Field>

          {/* TITLE */}
          <Field>
            <FieldLabel htmlFor="title">
              Title <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              id="title"
              className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
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
            <Textarea
              id="description"
              className="bg-[#FAFAFA] text-sm leading-6 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none min-h-12 rounded-lg shadow"
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
                  <SelectTrigger className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-14 cursor-pointer rounded-lg shadow">
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
                  className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
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
                <Input
                  id="year"
                  className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal border-none h-12 rounded-lg shadow"
                  placeholder="e.g 2025"
                  {...register("year")}
                />
                {errors.year && <FieldError>{errors.year.message}</FieldError>}
              </Field>
            </div>
          </div>

          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default UploadForm;

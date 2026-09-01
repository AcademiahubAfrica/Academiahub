import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { denied } from "@/lib/logging/denied";

type UploadKind = "avatar" | "document";

interface UploadPolicy {
  folder: string;
  maxBytes: number;
  allowedFormats: string;
  publicIdTemplate?: (userId: string) => string;
  overwrite?: boolean;
  invalidate?: boolean;
  eager?: string;
  stripMetadata?: boolean;
  /** Cloudinary-side preset. Carries the size cap, which is not a signable
      upload parameter and so cannot be enforced from here. */
  uploadPreset?: string;
}

// max_bytes and strip_metadata are not signable upload-API parameters
// (preset/paid-plan features); size is enforced post-upload, and q_auto in the
// eager pipeline already discards most metadata.
const POLICIES: Record<UploadKind, UploadPolicy> = {
  avatar: {
    folder: "academiahub/avatars",
    maxBytes: 4 * 1024 * 1024,
    allowedFormats: "jpg,png,webp",
    publicIdTemplate: (userId) => userId,
    overwrite: true,
    invalidate: true,
    eager: "c_fill,g_auto,w_400,h_400,f_auto,q_auto",
  },
  document: {
    folder: "academiahub/documents",
    maxBytes: 10 * 1024 * 1024,
    allowedFormats: "pdf",
    uploadPreset: "academiahub-documents",
  },
};

function isUploadKind(value: unknown): value is UploadKind {
  return value === "avatar" || value === "document";
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return denied({
      route: "/api/sign-cloudinary-params",
      reason: "no_session",
    });
  }

  const { kind } = await request.json().catch(() => ({}));
  if (!isUploadKind(kind)) {
    return NextResponse.json(
      { error: "Invalid upload kind" },
      { status: 400 },
    );
  }

  const config = cloudinary.config({ secure: true });
  const { cloud_name, api_key, api_secret } = config;

  if (!cloud_name || !api_key || !api_secret) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Set CLOUDINARY_URL." },
      { status: 500 },
    );
  }

  const policy = POLICIES[kind];
  const timestamp = Math.round(Date.now() / 1000);
  const publicId = policy.publicIdTemplate?.(session.user.id);

  const paramsToSign: Record<string, string | number | boolean> = {
    timestamp,
    folder: policy.folder,
    allowed_formats: policy.allowedFormats,
  };
  if (publicId) paramsToSign.public_id = publicId;
  if (policy.overwrite) paramsToSign.overwrite = true;
  if (policy.invalidate) paramsToSign.invalidate = true;
  if (policy.eager) paramsToSign.eager = policy.eager;
  /* Signed alongside everything else. Cloudinary checks the signature over
     every parameter it receives, so naming the preset without signing it is
     rejected outright. */
  if (policy.uploadPreset) paramsToSign.upload_preset = policy.uploadPreset;

  const signature = cloudinary.utils.api_sign_request(paramsToSign, api_secret);

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: api_key,
    cloudName: cloud_name,
    folder: policy.folder,
    publicId,
    overwrite: policy.overwrite,
    invalidate: policy.invalidate,
    eager: policy.eager,
    uploadPreset: policy.uploadPreset,
    maxBytes: policy.maxBytes,
    allowedFormats: policy.allowedFormats,
  });
}

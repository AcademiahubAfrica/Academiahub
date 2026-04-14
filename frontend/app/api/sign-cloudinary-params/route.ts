import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const UPLOAD_FOLDER = "academiahub/documents";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // The cloudinary SDK auto-loads CLOUDINARY_URL from the environment on
  // first call. Passing an empty override forces that initialization and
  // returns the resolved config.
  const config = cloudinary.config({ secure: true });
  const { cloud_name, api_key, api_secret } = config;

  if (!cloud_name || !api_key || !api_secret) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Set CLOUDINARY_URL." },
      { status: 500 },
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign: Record<string, string | number> = {
    timestamp,
    folder: UPLOAD_FOLDER,
  };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, api_secret);

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: api_key,
    cloudName: cloud_name,
    folder: UPLOAD_FOLDER,
  });
}

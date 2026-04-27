export type UploadKind = "avatar" | "document";

export interface SignResponse {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
  publicId?: string;
  overwrite?: boolean;
  invalidate?: boolean;
  eager?: string;
  maxBytes: number;
  allowedFormats: string;
}

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  original_filename: string;
  bytes: number;
  version: number;
  eager?: Array<{ secure_url: string; transformation: string }>;
}

export async function fetchSignedParams(kind: UploadKind): Promise<SignResponse> {
  const res = await fetch("/api/sign-cloudinary-params", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to prepare upload");
  }
  return (await res.json()) as SignResponse;
}

export function uploadToCloudinaryWithProgress(
  file: File,
  sign: SignResponse,
  onProgress?: (percent: number) => void,
): Promise<CloudinaryUploadResponse> {
  return new Promise((resolve, reject) => {
    const body = new FormData();
    body.append("file", file);
    body.append("api_key", sign.apiKey);
    body.append("timestamp", String(sign.timestamp));
    body.append("signature", sign.signature);
    body.append("folder", sign.folder);
    if (sign.publicId) body.append("public_id", sign.publicId);
    if (sign.overwrite) body.append("overwrite", "true");
    if (sign.invalidate) body.append("invalidate", "true");
    if (sign.eager) body.append("eager", sign.eager);
    body.append("allowed_formats", sign.allowedFormats);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${sign.cloudName}/auto/upload`,
    );

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText) as CloudinaryUploadResponse);
        } catch {
          reject(new Error("Invalid response from Cloudinary"));
        }
      } else {
        let message = "Cloudinary upload failed";
        try {
          const data = JSON.parse(xhr.responseText);
          message = data?.error?.message || message;
        } catch {
          // ignore
        }
        reject(new Error(message));
      }
    });

    xhr.addEventListener("error", () =>
      reject(new Error("Network error during upload")),
    );
    xhr.addEventListener("abort", () => reject(new Error("Upload aborted")));

    xhr.send(body);
  });
}

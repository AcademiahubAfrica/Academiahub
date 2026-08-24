/**
 * Server-side helpers for the Cloudinary assets behind a publication.
 *
 * The storage key (`public_id`) is what `cloudinary.uploader.destroy` acts on,
 * so it decides which file gets deleted. It is never taken from the request
 * body — it is derived here from the URL, which is validated against the
 * account and the documents folder first. Anything that does not parse cleanly
 * returns `null` and the caller refuses the operation.
 *
 * Reads `CLOUDINARY_URL`; do not import from a client component.
 */

export type CloudinaryResourceType = "image" | "raw" | "video";

/**
 * Publication assets live in one folder and nowhere else. The character class
 * is deliberately narrow — no slashes, so a key can never climb out of
 * `academiahub/documents/` into `academiahub/avatars/`.
 */
const DOCUMENT_KEY_PATTERN = /^academiahub\/documents\/[A-Za-z0-9_.-]{1,128}$/;

export function isValidDocumentUrl(url: string): boolean {
  const cloudName = (process.env.CLOUDINARY_URL || "").match(/@([^/?#]+)/)?.[1];
  if (!cloudName) return false;
  return (
    url.startsWith(`https://res.cloudinary.com/${cloudName}/`) &&
    url.includes("/academiahub/documents/")
  );
}

export function parseResourceType(fileUrl: string): CloudinaryResourceType {
  const match = fileUrl.match(/\/(image|raw|video)\/upload\//);
  return (match?.[1] as CloudinaryResourceType) ?? "image";
}

/**
 * Recover the `public_id` from a delivery URL.
 *
 * Cloudinary builds these as `.../<resource_type>/upload/<version>/<public_id>`
 * and appends the format extension for `image` and `video` resources while
 * keeping it inside the `public_id` for `raw` ones — so the extension is
 * stripped for the former and left alone for the latter.
 *
 * Returns `null` for anything that does not reduce to a key in the documents
 * folder, including URLs carrying transformation segments.
 */
export function deriveDocumentFileKey(fileUrl: string): string | null {
  const marker = "/upload/";
  const start = fileUrl.indexOf(marker);
  if (start === -1) return null;

  let key = fileUrl.slice(start + marker.length).split(/[?#]/)[0];
  key = key.replace(/^v\d+\//, "");

  if (parseResourceType(fileUrl) !== "raw") {
    key = key.replace(/\.[A-Za-z0-9]+$/, "");
  }

  return DOCUMENT_KEY_PATTERN.test(key) ? key : null;
}

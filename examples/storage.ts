/**
 * Storage Example — @sylphx/sdk
 *
 * Object storage for files, images, and media.
 * S3-compatible under the hood. Works server-side or with pre-signed URLs.
 *
 * Docs: https://sylphx.com/docs/storage
 */

import {
  createConfig,
  uploadFile,
  getFileUrl,
  deleteFile,
  listFiles,
} from "@sylphx/sdk";

const config = createConfig({
  secretKey: process.env.SYLPHX_APP_SECRET!,
});

// ──────────────────────────────────────────────
// Upload a file
// ──────────────────────────────────────────────

async function upload() {
  const file = new File(["Hello, Sylphx!"], "hello.txt", {
    type: "text/plain",
  });

  const result = await uploadFile(config, {
    file,
    path: "uploads/hello.txt",  // optional path prefix
    // access: 'public' | 'private' (default: 'private')
  });

  console.log("Uploaded:", result.url);
  return result;
}

// ──────────────────────────────────────────────
// Get a public URL or a pre-signed URL
// ──────────────────────────────────────────────

async function getUrl(fileId: string) {
  const url = await getFileUrl(config, {
    fileId,
    // expiresIn: 3600, // seconds (for private files)
  });

  console.log("URL:", url);
  return url;
}

// ──────────────────────────────────────────────
// List files in a folder
// ──────────────────────────────────────────────

async function list() {
  const files = await listFiles(config, {
    prefix: "uploads/",
    limit: 50,
  });

  console.log("Files:", files);
  return files;
}

// ──────────────────────────────────────────────
// Delete a file
// ──────────────────────────────────────────────

async function remove(fileId: string) {
  await deleteFile(config, { fileId });
  console.log("Deleted:", fileId);
}

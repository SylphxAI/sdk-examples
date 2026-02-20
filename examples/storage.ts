// MinIO / S3-compatible storage — drop-in for Vercel Blob or AWS S3
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,   // provided on onboarding
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true,
});

// Upload a file
export async function upload(key: string, body: Buffer, contentType: string) {
  await s3.send(new PutObjectCommand({
    Bucket: process.env.MINIO_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));
  return `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET}/${key}`;
}

// Generate a presigned URL (for private files)
export async function presignedUrl(key: string, expiresIn = 3600) {
  return getSignedUrl(s3, new GetObjectCommand({
    Bucket: process.env.MINIO_BUCKET,
    Key: key,
  }), { expiresIn });
}

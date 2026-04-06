import { Readable } from "node:stream";

import {
    GetObjectCommand,
    HeadBucketCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_REGION = "auto";
const DEFAULT_SIGNED_URL_EXPIRATION = 60;

function getRequiredEnv(name: string) {
    const value = process.env[name]?.trim();

    if (!value) {
        throw new Error(`Variavel de ambiente ausente: ${name}`);
    }

    return value;
}

export function getR2BucketName() {
    return process.env.R2_BUCKET_NAME?.trim() || "paroquia";
}

export function getR2Endpoint() {
    const accountId = getRequiredEnv("R2_ACCOUNT_ID");
    return process.env.R2_ENDPOINT?.trim() || `https://${accountId}.r2.cloudflarestorage.com`;
}

export function getR2Client() {
    return new S3Client({
        region: R2_REGION,
        endpoint: getR2Endpoint(),
        forcePathStyle: true,
        credentials: {
            accessKeyId: getRequiredEnv("R2_ACCESS_KEY_ID"),
            secretAccessKey: getRequiredEnv("R2_SECRET_ACCESS_KEY"),
        },
    });
}

export async function ensureR2BucketExists() {
    const client = getR2Client();
    await client.send(
        new HeadBucketCommand({
            Bucket: getR2BucketName(),
        }),
    );
}

export function buildR2AssetUrl(key: string) {
    const normalizedKey = key
        .split("/")
        .filter(Boolean)
        .map((segment) => encodeURIComponent(segment))
        .join("/");

    return `/api/storage/${normalizedKey}`;
}

export async function createR2PresignedUpload(options: {
    key: string;
    contentType: string;
    expiresIn?: number;
}) {
    const client = getR2Client();
    const command = new PutObjectCommand({
        Bucket: getR2BucketName(),
        Key: options.key,
        ContentType: options.contentType,
    });

    const uploadUrl = await getSignedUrl(client, command, {
        expiresIn: options.expiresIn ?? DEFAULT_SIGNED_URL_EXPIRATION,
    });

    return {
        key: options.key,
        uploadUrl,
        publicUrl: buildR2AssetUrl(options.key),
    };
}

export async function uploadBufferToR2(options: {
    key: string;
    body: ArrayBuffer;
    contentType: string;
}) {
    const client = getR2Client();
    await client.send(
        new PutObjectCommand({
            Bucket: getR2BucketName(),
            Key: options.key,
            Body: Buffer.from(options.body),
            ContentType: options.contentType,
        }),
    );

    return buildR2AssetUrl(options.key);
}

export async function getR2Object(key: string) {
    const client = getR2Client();
    return client.send(
        new GetObjectCommand({
            Bucket: getR2BucketName(),
            Key: key,
        }),
    );
}

export function toWebReadableStream(body: unknown) {
    if (!body) {
        return null;
    }

    if (typeof body === "object" && body !== null && "transformToWebStream" in body) {
        const transformToWebStream = (body as { transformToWebStream: () => ReadableStream }).transformToWebStream;
        return transformToWebStream();
    }

    if (body instanceof Readable) {
        return Readable.toWeb(body) as ReadableStream;
    }

    return null;
}

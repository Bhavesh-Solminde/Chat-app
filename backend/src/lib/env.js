import dotenv from "dotenv";

dotenv.config();

const sanitize = (value) =>
  typeof value === "string" ? value.trim() : value ?? undefined;

export const ENV = {
  CLIENT_URL: sanitize(process.env.CLIENT_URL),
  JWT_SECRET: sanitize(process.env.JWT_SECRET),
  MONGO_URI: sanitize(process.env.MONGO_URI),
  PORT: sanitize(process.env.PORT),
  NODE_ENV: sanitize(process.env.NODE_ENV) || "development",
  RESEND_API_KEY: sanitize(process.env.RESEND_API_KEY),
  EMAIL_FROM: sanitize(process.env.EMAIL_FROM),
  EMAIL_FROM_NAME: sanitize(process.env.EMAIL_FROM_NAME),
  CLOUDINARY_CLOUD_NAME: sanitize(process.env.CLOUDINARY_CLOUD_NAME),
  CLOUDINARY_API_KEY: sanitize(process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: sanitize(process.env.CLOUDINARY_API_SECRET),
  ARCJET_KEY: sanitize(process.env.ARCJET_KEY),
  ARCJET_ENV: sanitize(process.env.ARCJET_ENV) || "development",
};

const REQUIRED_ENV_MAP = {
  PORT: "Server listening port",
  MONGO_URI: "MongoDB connection string",
  JWT_SECRET: "JWT signing secret",
  CLIENT_URL: "Frontend origin used for redirects and emails",
  RESEND_API_KEY: "Resend API key for transactional emails",
  EMAIL_FROM: "Email sender address",
  EMAIL_FROM_NAME: "Email sender display name",
  CLOUDINARY_CLOUD_NAME: "Cloudinary cloud name",
  CLOUDINARY_API_KEY: "Cloudinary API key",
  CLOUDINARY_API_SECRET: "Cloudinary API secret",
  ARCJET_KEY: "Arcjet API key",
};

const missingEnvKeys = Object.keys(REQUIRED_ENV_MAP).filter((key) => !ENV[key]);

if (missingEnvKeys.length) {
  const details = missingEnvKeys
    .map((key) => `${key} (${REQUIRED_ENV_MAP[key]})`)
    .join(", ");
  throw new Error(`Missing required environment variables: ${details}`);
}

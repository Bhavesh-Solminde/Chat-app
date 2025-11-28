import { createRequire } from "module";
import { ENV } from "./env.js";

const require = createRequire(import.meta.url);
const { Resend } = require("resend");

const { RESEND_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME } = ENV;

if (!RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set; transactional emails are disabled.");
}

export const resendClient = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const sender = {
  email: EMAIL_FROM,
  name: EMAIL_FROM_NAME,
};

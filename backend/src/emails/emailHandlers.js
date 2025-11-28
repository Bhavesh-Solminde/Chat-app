import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  if (!resendClient) {
    console.warn("Skipping welcome email: Resend client is not configured.");
    return;
  }

  if (!sender.email) {
    console.warn("Skipping welcome email: EMAIL_FROM is not configured.");
    return;
  }

  const { data, error } = await resendClient.emails.send({
    from: `${sender.name || "Chat App"} <${sender.email}>`,
    to: email,
    subject: "Welcome to Chat App!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    return console.error({ error });
  }

  console.log("welcome email sent successfully:", data);
};

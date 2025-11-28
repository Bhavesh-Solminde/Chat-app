import { User } from "../models/User.js";
import { generateToken } from "../lib/util.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";

export async function signupController(req, res) {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const confirmUser = await User.findOne({ email });
    if (confirmUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname: fullname,
      email,
      password: hashedPass,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
    });
    //todo: send welcome email

    try {
      await sendWelcomeEmail(newUser.email, newUser.fullname, ENV.CLIENT_URL);
    } catch (err) {
      console.error("Failed to send welcome email:", err);
    }
  } catch (error) {
    console.error("Error in signupController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loginController(req, res) {
  res.send("login endpoint");
}

export async function logoutController(req, res) {
  res.send("logout endpoint");
}

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { supabase } from "../libs/supabaseClient.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// 🔹 Setup Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // business.novomind@gmail.com
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// 🔹 REGISTER (Signup + Email Verification)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    // Check if user already exists
    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existing)
      return res.status(400).json({ error: "User already exists" });

    // Hash password and generate verification token
    const hashed = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    // Insert new user with verification token
    const { error } = await supabase.from("users").insert([
      {
        email,
        password: hashed,
        is_verified: false,
        verification_token: token,
      },
    ]);

    if (error) throw error;

    // Send verification email
    const verifyLink = `${process.env.BASE_URL}/api/auth/verify/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your Novomind account",
      html: `
        <h3>Welcome to Novomind 👋</h3>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verifyLink}" target="_blank">${verifyLink}</a>
        <p>This link will confirm your account so you can log in.</p>
      `,
    });

    res.json({
      message:
        "Signup successful! Check your email for the verification link.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 VERIFY EMAIL
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const { data, error } = await supabase
      .from("users")
      .update({ is_verified: true, verification_token: null })
      .eq("verification_token", token)
      .select();

    if (error || !data.length)
      return res.status(400).send("Invalid or expired token");

    res.send("✅ Email verified successfully! You can now login.");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user)
      return res.status(400).json({ error: "Invalid email or password" });

    if (!user.is_verified)
      return res.status(400).json({ error: "Please verify your email first" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

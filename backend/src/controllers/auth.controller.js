import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utilis.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import dotenv from "dotenv";
import cloudinary from "../lib/cloudinary.js";

dotenv.config();

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All Fields are required " });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          process.env.CLIENT_URL,
        );
      } catch (err) {
        console.error("Failed to send welcome email:", err);
      }

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profile,
      });
    } else {
      res.status(400).json({ message: "Error creating user" });
    }
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: " Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.staus(400).json({ message: "Fields are required" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.staus(400).json({ message: "Inavlid Credentials " });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profile: user.profile,
    });
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout Successfully" });
};

export const updateprofile = async (req, res) => {
  try {
    const { profile } = req.body.profile;
    if (!profile) {
      return res.status(400).json({ message: "Profile Pic is required" });
    }
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uplooad(profile);
    const updatedUser = await User.findById(
      userId,
      { profile: uploadResponse.secure_url },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.staus(500).json({ message: "Internal server error" });
  }
};

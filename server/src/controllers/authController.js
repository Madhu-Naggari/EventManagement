const User = require("../models/User");
const fs = require("fs");
const generateToken = require("../utils/generateToken");
const { OAuth2Client } = require("google-auth-library");
const cloudinary = require("../config/cloudinary");
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage",
);

exports.registerUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      contact,
      description,
      gender,
      profileImage,
    } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === "organizer" ? "organizer" : "user",
      contact,
      description,
      gender,
      profileImage,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Authorization code missing" });
    }

    // 🔥 Exchange code for tokens
    const { tokens } = await client.getToken(code);
    const { id_token } = tokens;

    // 🔥 Verify ID token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const result = await cloudinary.uploader.upload(picture, {
        folder: "event-management/users",
      });

      user = await User.create({
        name,
        email,
        password: Math.random().toString(36).slice(-8),
        profileImage: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getProfileDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, contact, description, gender } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update allowed fields
    if (name) user.name = name;
    if (contact) user.contact = contact;
    if (description) user.description = description;
    if (gender) user.gender = gender;

    // If new image uploaded
    if (req.file) {
      try {
        // 1. Delete old image from Cloudinary if it exists
        if (user.profileImage?.public_id) {
          await cloudinary.uploader.destroy(user.profileImage.public_id);
        }

        // 2. Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "event-management/users",
          resource_type: "image",
        });

        // 3. Update user data
        user.profileImage = {
          url: result.secure_url,
          public_id: result.public_id,
        };

        // 4. CLEANUP: Delete the local temp file from 'uploads' folder
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        // If upload fails, still try to delete the temp file
        if (req.file && req.file.path) fs.unlinkSync(req.file.path);
        throw new Error("Image upload failed");
      }
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      contact: updatedUser.contact,
      description: updatedUser.description,
      gender: updatedUser.gender,
      profileImage: updatedUser.profileImage,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    next(error);
  }
};

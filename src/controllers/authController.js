import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExists = await User.find({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = new User({
    name,
    email,
    password,
  });
  await user.save();
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.find({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

import Developer from "../models/developerModel.js";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../utils/appError.js";

export const createDeveloper = expressAsyncHandler(async (req, res, next) => {
  const { name, details, perviousWork } = req.body;
  const logo = req.file?.path;
  if (!logo) {
    return next(new AppError("Logo is required", 400));
  }
  const developer = new Developer({ logo, name, details, perviousWork });
  await developer.save();
  res.status(201).json({
    status: "success",
    message: "Developer created successfully",
    developer,
  });
});

export const getDevelopers = expressAsyncHandler(async (req, res, next) => {
  const developers = await Developer.find();
  res.status(200).json({
    status: "success",
    message: "Developers fetched successfully",
    developers,
  });
});

export const getDeveloper = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const developer = await Developer.findById(id);
  if (!developer) {
    return next(new AppError("Developer not found with this ID", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Developer fetched successfully",
    developer,
  });
});

export const updateDeveloper = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const developer = await Developer.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!developer) {
    return next(new AppError("Developer not found with this ID", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Developer updated successfully",
    developer,
  });
});

export const deleteDeveloper = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await Developer.findByIdAndDelete(id);
  res
    .status(204)
    .json({ status: "success", message: "Developer deleted successfully" });
});

import expressAsyncHandler from "express-async-handler";
import Compound from "../models/compoundsModel.js";
import Developer from "../models/developerModel.js";
import Location from "../models/locationModel.js";
import { AppError } from "../utils/appError.js";

export const createCompound = expressAsyncHandler(async (req, res, next) => {
  const { name, location, developer } = req.body;
  const SearchLocation = await Location.findById(location);
  if (!SearchLocation) {
    return next(new AppError("Invalid location", 404));
  }
  const SearchDeveloper = await Developer.findById(developer);
  if (!SearchDeveloper) {
    return next(new AppError("Invalid developer", 404));
  }
  const compound = new Compound({
    name,
    location,
    developer,
  });
  await compound.save();
  res.status(201).json({
    status: "success",
    message: "Compound created successfully",
    compound,
  });
});

export const getCompounds = expressAsyncHandler(async (req, res, next) => {
  const compounds = await Compound.find()
    .populate("location")
    .populate("developer");
  res.status(200).json({
    status: "success",
    message: "Compound found successfully",
    compounds,
  });
});

export const getCompound = expressAsyncHandler(async (req, res, next) => {
  const compound = await Compound.findById(req.params.id)
    .populate("location")
    .populate("developer");
  if (!compound) {
    return next(new AppError("Invalid compound", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Compound found successfully",
    compound,
  });
});

export const updateCompound = expressAsyncHandler(async (req, res, next) => {
  const compound = await Compound.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!compound) {
    return next(new AppError("Invalid compound", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Compound updated successfully",
    compound,
  });
});

export const deleteCompound = expressAsyncHandler(async (req, res, next) => {
  const compound = await Compound.findByIdAndDelete(req.params.id);
  if (!compound) {
    return next(new AppError("Invalid compound", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Compound deleted successfully",
  });
});

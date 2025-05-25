import Location from "../models/locationModel.js";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../utils/appError.js";

export const createLocation = expressAsyncHandler(async (req, res) => {
  const { governorate, area } = req.body;
  const location = new Location({ governorate, area });
  await location.save();
  res.status(201).json({
    status: "success",
    message: "Location created successfully",
    location,
  });
});

export const getLocations = expressAsyncHandler(async (req, res) => {
  const locations = await Location.find();
  res.status(200).json({
    status: "success",
    message: "Locations fetched successfully",
    locations,
  });
});

export const getLocation = expressAsyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (!location) {
    return next(new AppError("Location not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Location fetched successfully",
    location,
  });
});

export const updateLocation = expressAsyncHandler(async (req, res) => {
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!location) {
    return next(new AppError("Location not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Location updated successfully",
    location,
  });
});

export const deleteLocation = expressAsyncHandler(async (req, res) => {
  const location = await Location.findByIdAndDelete(req.params.id);
  if (!location) {
    return next(new AppError("Location not found", 404));
  }

  res
    .status(204)
    .json({ status: "success", message: "Location deleted successfully" });
});

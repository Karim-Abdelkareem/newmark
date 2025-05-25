import Type from "../models/typeModel.js";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../utils/appError.js";

export const createType = expressAsyncHandler(async (req, res, next) => {
  const { title } = req.body;

  const existingType = await Type.findOne({ title });
  if (existingType) {
    return next(new AppError("Type already exists", 400));
  }
  const type = new Type({
    title,
  });
  await type.save();
  res.status(201).json({
    status: "success",
    message: "Type Created Successfully",
    type,
  });
});

export const getTypes = expressAsyncHandler(async (req, res) => {
  const types = await Type.find();
  res.status(200).json({
    status: "success",
    message: "Types fetched Successfully",
    types,
  });
});

export const getTypeById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const type = await Type.findById(id);
  if (!type) {
    return next(new AppError("Type not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Type fetched Successfully",
    type,
  });
});

export const updateType = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  const type = await Type.findByIdAndUpdate(
    id,
    { title },
    { new: true, runValidators: true }
  );
  if (!type) {
    return next(new AppError("Type not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Type updated Successfully",
    type,
  });
});

export const deleteType = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const type = await Type.findByIdAndDelete(id);
  if (!type) {
    return next(new AppError("Type not found", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Type deleted Successfully",
  });
});

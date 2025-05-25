import SubType from "../models/subTypeModel.js";
import Type from "../models/typeModel.js";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../utils/appError.js";

export const createSubType = expressAsyncHandler(async (req, res, next) => {
  const { name, typeIds } = req.body;

  if (!name || !Array.isArray(typeIds) || typeIds.length === 0) {
    return next(
      new AppError("Name, and at least one type ID are required", 400)
    );
  }

  const types = await Type.find({ _id: { $in: typeIds } });
  if (types.length !== typeIds.length) {
    return next(new AppError("One or more provided Type IDs are invalid", 400));
  }

  const existing = await SubType.findOne({ $or: [{ name }] });
  if (existing) {
    return next(
      new AppError("SubType with the same name or slug already exists", 400)
    );
  }

  const subType = new SubType({
    name,
    types: typeIds,
  });

  await subType.save();

  // Add the SubType to each Type's subTypes array
  await Type.updateMany(
    { _id: { $in: typeIds } },
    { $addToSet: { subTypes: subType._id } }
  );

  await subType.populate("types", "title slug");

  res.status(201).json({
    status: "success",
    message: "SubType created and associated with Types",
    subType,
  });
});

export const getSubTypes = expressAsyncHandler(async (req, res) => {
  const subTypes = await SubType.find();
  res.status(200).json({
    status: "success",
    message: "SubTypes fetched successfully",
    subTypes,
  });
});
export const getSubTypeById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subType = await SubType.findById(id).populate(
    "types",
    "title slug -_id"
  );
  if (!subType) {
    return next(new AppError("SubType not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "SubType fetched successfully",
    subType,
  });
});

export const updateSubType = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, typeIds } = req.body;

  if (!name || !Array.isArray(typeIds) || typeIds.length === 0) {
    return next(
      new AppError("Name, slug, and at least one Type ID are required", 400)
    );
  }

  const types = await Type.find({ _id: { $in: typeIds } });
  if (types.length !== typeIds.length) {
    return next(new AppError("One or more Type IDs are invalid", 400));
  }

  const subType = await SubType.findById(id);
  if (!subType) {
    return next(new AppError("SubType not found", 404));
  }

  await Type.updateMany(
    { _id: { $in: subType.types } },
    { $pull: { subTypes: subType._id } }
  );

  subType.name = name;
  subType.types = typeIds;
  await subType.save();

  await Type.updateMany(
    { _id: { $in: typeIds } },
    { $addToSet: { subTypes: subType._id } }
  );

  await subType.populate("types", "title slug");

  res.status(200).json({
    status: "success",
    message: "SubType updated successfully",
    subType,
  });
});

export const deleteSubType = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subType = await SubType.findByIdAndDelete(id).populate(
    "type",
    "name slug"
  );
  if (!subType) {
    return next(new AppError("SubType not found", 404));
  }

  const type = await Type.findById(subType.type._id);
  if (type) {
    type.subTypes.pull(subType._id);
    await type.save();
  }

  res.status(200).json({
    status: "success",
    message: "SubType deleted successfully",
    subType,
  });
});

export const getSubTypesByType = expressAsyncHandler(async (req, res, next) => {
  const { typeId } = req.params;

  const type = await Type.findById(typeId).populate("subTypes", "name slug");
  if (!type) {
    return next(new AppError("Type not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "SubTypes fetched successfully for the Type",
    subTypes: type.subTypes,
  });
});

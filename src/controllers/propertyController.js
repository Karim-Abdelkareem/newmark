import expressAsyncHandler from "express-async-handler";
import { AppError } from "../utils/appError.js";
import Property from "../models/propertyModel.js";
import Developer from "../models/developerModel.js";

export const createProperty = expressAsyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    developer,
    location,
    compound,
    type,
    subType,
    price,
    downPayment,
    installment,
    deliveryDate,
    specialOffer,
    bathrooms,
    bedrooms,
    space,
    mapLink,
    isApproved,
  } = req.body;

  const images = req.files?.images?.map((file) => file.path) || [];
  const videos = req.files?.videos?.map((file) => file.path) || [];
  const master = req.files?.master?.[0]?.path || "";

  const proprety = new Property({
    title,
    description,
    developer,
    location,
    compound,
    type,
    subType,
    images,
    videos,
    master,
    price,
    payment: {
      downPayment,
      installment,
      deliveryDate,
      specialOffer,
    },
    bathrooms,
    bedrooms,
    space,
    mapLink,
    isApproved,
  });
  await proprety.save();
  res.status(201).json({
    status: "success",
    message: "Proprety Created Successfully",
    proprety,
  });
});

export const getPropreties = expressAsyncHandler(async (req, res) => {
  const propreties = await Property.find();
  res.status(200).json({
    status: "success",
    message: "Proprety fetched Successfully",
    propreties,
  });
});

export const getApprovedPropreties = expressAsyncHandler(async (req, res) => {
  const propreties = await Property.find({
    isApproved: true,
  });
  res.status(200).json({
    status: "success",
    message: "Proprety fetched Successfully",
    propreties,
  });
});

export const getNonApprovedPropreties = expressAsyncHandler(
  async (req, res) => {
    const properties = await Property.find({
      isApproved: false,
    });
    res.status(200).json({
      status: "success",
      message: "Proprety fetched Successfully",
      properties,
    });
  }
);

export const getPropretyById = expressAsyncHandler(async (req, res, next) => {
  const propretyId = req.params.id;
  const property = await findById(propretyId);
  if (!property) return next(new AppError("Property not found", 404));
  res.status(200).json({
    status: "success",
    message: "Proprety fetched Successfully",
    property,
  });
});

export const updateProprety = expressAsyncHandler(async (req, res, next) => {
  const propertyId = req.params.id;
  const property = await Property.findByIdAndUpdate(propertyId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!property) return next(new AppError("Property not found", 404));
  res.status(200).json({
    status: "success",
    message: "Proprety fetched Successfully",
    property,
  });
});

export const deleteProperty = expressAsyncHandler(async (req, res, next) => {
  const propertyId = req.params.id;
  const property = await Property.findByIdAndDelete(propertyId);
  if (!property) return next(new AppError("Property not found", 404));
  res.status(204).json({
    status: "success",
    message: "Proprety Deleted Successfully",
  });
});

export const changeApproveProprety = expressAsyncHandler(
  async (req, res, next) => {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (!property) return next(new AppError("Property not found", 404));

    await Property.findByIdAndUpdate(
      propertyId,
      { isApproved: !property.isApproved },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Property Approved Successfully",
      property,
    });
  }
);

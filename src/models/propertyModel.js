import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },
  subType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubType",
    required: true,
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  compound: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Compound",
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  videos: [
    {
      type: String,
    },
  ],
  master: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    downPayment: {
      type: String,
      required: true,
    },
    installment: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
      required: true,
    },
    specialOffer: {
      type: Boolean,
      default: false,
    },
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  space: {
    type: Number,
    required: true,
  },
  mapLink: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Property", propertySchema);

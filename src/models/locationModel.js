import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  governorate: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Location", locationSchema);

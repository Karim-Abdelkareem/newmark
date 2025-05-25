import mongoose from "mongoose";

const compoundschema = new mongoose.Schema({
  name: {
    type: String,
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
  },
});

export default mongoose.model("Compound", compoundschema);
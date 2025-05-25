import mongoose from "mongoose";

const develpoerSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  perviousWork: {
    type: String,
  },
});

export default mongoose.model("Developer", develpoerSchema);

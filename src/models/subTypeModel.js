import mongoose from "mongoose";
import slugify from "slugify";

const subTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
  },
  types: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
});

subTypeSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

subTypeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }
  next();
});

subTypeSchema.pre("updateMany", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }
  next();
});

const SubType = mongoose.model("SubType", subTypeSchema);
export default SubType;

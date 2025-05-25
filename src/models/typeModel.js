import mongoose from "mongoose";
import slugify from "slugify";

const typeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    subTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubType",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

typeSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

typeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title, { lower: true, strict: true });
  }
  next();
});

typeSchema.pre("updateMany", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title, { lower: true, strict: true });
  }
  next();
});

const Type = mongoose.model("Type", typeSchema);
export default Type;

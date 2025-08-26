import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide category name"],
      trim: true,
      unique: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot be more than 200 characters"],
    },
    image: {
      type: String,
      required: [true, "Please provide category image"],
    },
    icon: {
      type: String,
      required: [true, "Please provide category icon"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for menu items in this category
categorySchema.virtual("menuItems", {
  ref: "MenuItem",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

// Virtual for restaurants using this category
categorySchema.virtual("restaurants", {
  ref: "Restaurant",
  localField: "_id",
  foreignField: "categories",
  justOne: false,
});

const Category = mongoose.model("Category", categorySchema);

export default Category;

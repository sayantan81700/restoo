import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a restaurant name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    cuisine: [
      {
        type: String,
        required: [true, "Please provide at least one cuisine type"],
      },
    ],
    address: {
      street: {
        type: String,
        required: [true, "Please provide street address"],
      },
      city: {
        type: String,
        required: [true, "Please provide city"],
      },
      state: {
        type: String,
        required: [true, "Please provide state"],
      },
      zipCode: {
        type: String,
        required: [true, "Please provide zip code"],
      },
      country: {
        type: String,
        required: [true, "Please provide country"],
      },
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [
      {
        type: String,
        required: [true, "Please provide at least one image"],
      },
    ],
    openingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      required: [true, "Please provide delivery fee"],
      min: 0,
    },
    minimumOrder: {
      type: Number,
      required: [true, "Please provide minimum order amount"],
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create index for geospatial queries
restaurantSchema.index({ location: "2dsphere" });

// Virtual for menu items
restaurantSchema.virtual("menuItems", {
  ref: "MenuItem",
  localField: "_id",
  foreignField: "restaurant",
  justOne: false,
});

// Virtual for reviews
restaurantSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "restaurant",
  justOne: false,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;

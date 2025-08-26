import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide item name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please provide item description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide item price"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Please provide item image"],
    },
    ingredients: [
      {
        type: String,
        required: [true, "Please provide at least one ingredient"],
      },
    ],
    dietaryInfo: {
      isVegetarian: {
        type: Boolean,
        default: false,
      },
      isVegan: {
        type: Boolean,
        default: false,
      },
      isGlutenFree: {
        type: Boolean,
        default: false,
      },
      allergens: [
        {
          type: String,
          enum: [
            "dairy",
            "eggs",
            "fish",
            "shellfish",
            "tree nuts",
            "peanuts",
            "wheat",
            "soy",
          ],
        },
      ],
    },
    preparationTime: {
      type: Number,
      required: [true, "Please provide preparation time in minutes"],
      min: [0, "Preparation time cannot be negative"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
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
    customizationOptions: [
      {
        name: {
          type: String,
          required: true,
        },
        options: [
          {
            name: String,
            price: Number,
          },
        ],
        required: {
          type: Boolean,
          default: false,
        },
        multiple: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for reviews
menuItemSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "menuItem",
  justOne: false,
});

// Calculate average rating
menuItemSchema.methods.calculateAverageRating = async function () {
  const reviews = await this.model("Review").find({ menuItem: this._id });

  if (reviews.length === 0) {
    this.rating = 0;
    this.totalRatings = 0;
  } else {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = totalRating / reviews.length;
    this.totalRatings = reviews.length;
  }

  await this.save();
};

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;

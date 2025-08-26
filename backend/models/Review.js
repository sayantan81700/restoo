import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a review comment"],
      maxlength: [500, "Comment cannot be more than 500 characters"],
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    response: {
      from: {
        type: String,
        enum: ["restaurant_owner", "admin"],
      },
      comment: String,
      date: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent user from submitting multiple reviews for the same order
reviewSchema.index({ order: 1, user: 1 }, { unique: true });

// Update restaurant and menu item ratings when a review is created/updated/deleted
reviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.restaurant, this.menuItem);
});

reviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.restaurant, this.menuItem);
});

// Static method to calculate average rating
reviewSchema.statics.calculateAverageRating = async function (
  restaurantId,
  menuItemId
) {
  const stats = await this.aggregate([
    {
      $match: {
        restaurant: restaurantId,
        ...(menuItemId && { menuItem: menuItemId }),
      },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    if (menuItemId) {
      await mongoose.model("MenuItem").findByIdAndUpdate(menuItemId, {
        rating: stats[0].averageRating,
        totalRatings: stats[0].totalReviews,
      });
    } else {
      await mongoose.model("Restaurant").findByIdAndUpdate(restaurantId, {
        rating: stats[0].averageRating,
        totalRatings: stats[0].totalReviews,
      });
    }
  } else {
    if (menuItemId) {
      await mongoose.model("MenuItem").findByIdAndUpdate(menuItemId, {
        rating: 0,
        totalRatings: 0,
      });
    } else {
      await mongoose.model("Restaurant").findByIdAndUpdate(restaurantId, {
        rating: 0,
        totalRatings: 0,
      });
    }
  }
};

const Review = mongoose.model("Review", reviewSchema);

export default Review;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
        customization: [
          {
            name: String,
            option: String,
            price: Number,
          },
        ],
        specialInstructions: String,
      },
    ],
    deliveryAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      instructions: String,
    },
    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready_for_pickup",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      required: true,
    },
    paymentDetails: {
      stripePaymentIntentId: String,
      stripeCustomerId: String,
      amount: Number,
      currency: String,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    tip: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    cancellationReason: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      maxlength: [500, "Review cannot be more than 500 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Calculate total before saving
orderSchema.pre("save", function (next) {
  if (
    this.isModified("items") ||
    this.isModified("deliveryFee") ||
    this.isModified("tax") ||
    this.isModified("tip")
  ) {
    // Calculate subtotal from items
    this.subtotal = this.items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const customizationTotal = item.customization.reduce(
        (sum, custom) => sum + (custom.price || 0),
        0
      );
      return total + itemTotal + customizationTotal;
    }, 0);

    // Calculate total
    this.total = this.subtotal + this.deliveryFee + this.tax + this.tip;
  }
  next();
});

// Virtual for tracking order timeline
orderSchema.virtual("timeline", {
  ref: "OrderTimeline",
  localField: "_id",
  foreignField: "order",
  justOne: false,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

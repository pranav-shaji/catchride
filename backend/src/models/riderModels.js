import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },

    endLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },

    // IMPORTANT FIELDS YOU WERE MISSING:
    isActive: { type: Boolean, default: true },

    status: {
      type: String,
      enum: ["available", "matched", "completed", "cancelled"],
      default: "available",
    },

    travellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Ride", rideSchema);

 
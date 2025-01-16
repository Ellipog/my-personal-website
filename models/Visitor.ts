import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);

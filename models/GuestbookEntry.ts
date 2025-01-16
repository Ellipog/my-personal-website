import mongoose from "mongoose";

const guestbookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    message: {
      type: String,
      required: true,
      maxLength: 500,
    },
    email: {
      type: String,
      required: false,
      maxLength: 100,
    },
    website: {
      type: String,
      required: false,
      maxLength: 100,
    },
    favorite_color: {
      type: String,
      required: false,
      maxLength: 20,
    },
  },
  {
    timestamps: true,
  }
);

export const GuestbookEntry =
  mongoose.models.GuestbookEntry ||
  mongoose.model("GuestbookEntry", guestbookSchema);

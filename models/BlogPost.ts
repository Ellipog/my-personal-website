import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    imageUrl: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

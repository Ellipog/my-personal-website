import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    question: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    answer: {
      type: String,
      required: false,
      maxLength: 2000,
    },
    isAnswered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

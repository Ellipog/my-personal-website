import { connectToDatabase } from "@/lib/mongodb";
import { Question } from "@/models/Question";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET() {
  try {
    await connectToDatabase();
    const questions = await Question.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const headersList = await headers();
    const adminPassword = headersList.get("x-admin-password");
    const data = await request.json();

    if (data.answer && (!adminPassword || adminPassword !== ADMIN_PASSWORD)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (data.answer) {
      const updatedQuestion = await Question.findByIdAndUpdate(
        data.questionId,
        { answer: data.answer, isAnswered: true },
        { new: true }
      );
      return NextResponse.json(updatedQuestion);
    }

    const newQuestion = await Question.create({
      name: data.name,
      question: data.question,
    });

    return NextResponse.json(newQuestion);
  } catch (error) {
    console.error("Error with question:", error);
    return NextResponse.json(
      { error: "Failed to process question" },
      { status: 500 }
    );
  }
}

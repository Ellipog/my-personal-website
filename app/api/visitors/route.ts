import { connectToDatabase } from "@/lib/mongodb";
import { Visitor } from "@/models/Visitor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("1. Starting database connection...");
    await connectToDatabase();
    console.log("2. Database connected successfully");

    const visitor = (await Visitor.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    ).lean()) as unknown as { count: number };

    console.log("3. Visitor data:", visitor);

    if (!visitor) {
      console.log("4. No visitor data found");
      return NextResponse.json({ count: 1 });
    }

    return NextResponse.json({ count: visitor.count });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: "Failed to update visitor count" },
      { status: 500 }
    );
  }
}

import { connectToDatabase } from "@/lib/mongodb";
import { GuestbookEntry } from "@/models/GuestbookEntry";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const entries = await GuestbookEntry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbook entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    const newEntry = await GuestbookEntry.create({
      name: data.name,
      message: data.message,
      email: data.email,
      website: data.website,
      favorite_color: data.favorite_color,
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to create guestbook entry" },
      { status: 500 }
    );
  }
}

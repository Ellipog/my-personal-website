import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function validateAdminPassword(password: string) {
  return password === ADMIN_PASSWORD;
}

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const adminPassword = headersList.get("x-admin-password");

    if (!adminPassword || !validateAdminPassword(adminPassword)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();

    const newPost = await BlogPost.create({
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      tags: data.tags,
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

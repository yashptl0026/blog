import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { BlogPost } from "@/types/blog";

// GET /api/posts - Fetch all posts
export async function GET() {
  const posts = await db.getPosts();
  return NextResponse.json(posts);
}

// POST /api/posts - Create a new post
export async function POST(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  const expectedKey = process.env.ADMIN_PASSWORD || "admin";
  if (adminKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, subtitle, excerpt, category, location, postType, coverImage, author, prepTime, difficulty } = body;

    if (!title || !excerpt || !category || !location || !postType || !coverImage || !author?.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title,
      slug,
      excerpt,
      category,
      location,
      postType,
      coverImage,
      author: {
        name: author.name,
        avatar: author.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
      },
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      readingTime: `${Math.ceil(excerpt.split(" ").length / 200)} min read`,
      ...(postType === "Recipe" ? { prepTime: prepTime || "20 mins", difficulty: difficulty || "Easy" } : {}),
    };

    await db.addPost(newPost);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 500 });
  }
}

// DELETE /api/posts?id=... - Delete a post
export async function DELETE(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  const expectedKey = process.env.ADMIN_PASSWORD || "admin";
  if (adminKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
  }

  const success = await db.deletePost(id);
  if (!success) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

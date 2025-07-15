import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/news - fetch all news
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    // Fetch single news by id
    const news = await prisma.news.findUnique({ where: { id } });
    if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(news);
  }
  // Fetch all news, newest first
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(news);
}

// POST /api/news - create news (admin only)
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || session.user?.email?.toLowerCase() !== "admin@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, content, author, imageUrl, tags } = await req.json();
  if (!title || !content || !author) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const news = await prisma.news.create({
    data: {
      title,
      content,
      author,
      imageUrl,
      tags: Array.isArray(tags) ? tags : [],
    },
  });
  return NextResponse.json(news, { status: 201 });
} 
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || session.user?.email?.toLowerCase() !== "admin@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { title, description, director, releaseYear, imageUrl } = data;
  if (!title || !description) {
    return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        director,
        releaseYear: releaseYear ? Number(releaseYear) : null,
        imageUrl,
      },
    });
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error("Movie creation error:", error);
    let details: string;
    if (error instanceof Error) {
      details = error.message;
    } else if (typeof error === "string") {
      details = error;
    } else {
      details = JSON.stringify(error);
    }
    return NextResponse.json({ error: "Failed to create movie", details }, { status: 500 });
  }
} 
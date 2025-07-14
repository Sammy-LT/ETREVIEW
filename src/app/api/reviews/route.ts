import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // Require authentication
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { movieId, rating, comment } = await req.json();
  if (!movieId || !rating) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Prevent duplicate reviews by the same user for the same movie
  const existing = await prisma.review.findFirst({
    where: { movieId, userId: session.user.id },
  });
  if (existing) {
    return NextResponse.json({ error: "You have already rated this movie." }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      movieId,
      rating,
      comment,
      userId: session.user.id,
    },
  });

  return NextResponse.json(review);
} 
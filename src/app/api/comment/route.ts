import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { content, postId } = await request.json();
    const { userId } = await auth();

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId: userId || "",
      },
    });

    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId") || "";
    const comments = await prisma.comment.findMany({
      where: {
        postId: parseInt(postId),
      },
      include: {
        _count: {
          select: {
            Like: true,
          },
        },
      },
    });
    return NextResponse.json(comments);
  } catch (err) {
    return NextResponse.json(err);
  }
}

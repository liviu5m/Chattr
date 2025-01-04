import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { postId, commentId, type } = await request.json();
    const { userId } = await auth();
    const like = await prisma.like.findFirst({
      where: {
        postId,
        commentId,
        userId: userId || "",
      },
    });
    if (type == "getLike") {
      return NextResponse.json(like);
    } else if (type == "changeLike") {
      if (!like) {
        const likeCreated = await prisma.like.create({
          data: {
            postId,
            commentId,
            userId: userId || "",
          },
        });
        return NextResponse.json(likeCreated);
      } else {
        const likeDeleted = await prisma.like.delete({
          where: {
            id: like.id,
          },
        });
        return NextResponse.json(likeDeleted);
      }
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}

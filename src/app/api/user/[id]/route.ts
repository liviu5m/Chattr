import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "";
  try {
    if(type == "username") {
      const user = await prisma.user.findFirst({
        where: {
          username: id,
        },
        include: {
          _count: {
            select: {
              follower: true,
              following: true,
            },
          },
        },
      });
      return NextResponse.json(user);
    }else if(type == "loggedUser") {
      const { userId } = await auth();
      return NextResponse.json(userId == id);
    }
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            follower: true,
            following: true,
          },
        },
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(err);
  }
}

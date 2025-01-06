import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const { userId: followerId } = await auth();
  try {
    const follower = await prisma.followers.findFirst({
      where: {
        followingId: id,
        followerId: followerId || ""
      },
    });
    return NextResponse.json(follower);
  } catch (err) {
    return NextResponse.json(err);
  }
}

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { Followers } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { followingId } = await request.json();
    const { userId: followerId } = await auth();
    console.log("follower");

    const follower = await prisma.followers.findFirst({
      where: {
        followingId,
        followerId: followerId || ""
      },
    });
    
    if (!follower) {
      const follower = await prisma.followers.create({
        data: {
          followerId: followerId || "",
          followingId,
        },
      });
      return NextResponse.json(follower);
    } else {
      const followerDelete = await prisma.followers.delete({
        where: {
          id: follower.id
        },
      });
      return NextResponse.json(followerDelete);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}

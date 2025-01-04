import prisma from "@/lib/client";
import { auth, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "";
    if (type == "registeredUser") {
      const { userId } = await auth();
      if (userId) {
        const user = await prisma.user.findFirst({
          where: {
            id: userId,
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
      } else return NextResponse.json("no user");
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      type,
      url,
      username,
      name,
      birthDate,
      gender,
      bio,
      phone,
      website,
      address,
    } = await request.json();
    const { userId } = await auth();
    if (type == "profilePhoto") {
      const user = await prisma.user.update({
        where: {
          id: userId || "",
        },
        data: {
          profilePhoto: url,
        },
      });
      return NextResponse.json(user);
    } else if (type == "coverPhoto") {
      const user = await prisma.user.update({
        where: {
          id: userId || "",
        },
        data: {
          coverPhoto: url,
        },
      });
      return NextResponse.json(user);
    } else if (type == "userData") {
      const user = await prisma.user.update({
        where: {
          id: userId || "",
        },
        data: {
          username,
          name,
          birthDate,
          gender,
          bio,
          phone,
          website,
          address,
        },
      });
      return NextResponse.json(user);
    }

    return NextResponse.json("user");
  } catch (err) {
    return NextResponse.json(err);
  }
}

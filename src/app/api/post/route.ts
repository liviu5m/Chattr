import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { content, url } = await request.json();
    const { userId } = await auth();
    console.log({
      content,
      url,
      userId: userId || "",
    });

    const post = await prisma.post.create({
      data: {
        content,
        url,
        userId: userId || "",
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    console.log(err);

    return NextResponse.json(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "";
    const userId = searchParams.get("userId") || "";
    const { userId: userAuth } = await auth();
    
    if (type == "userId") {
      const posts = await prisma.post.findMany({
        where: {
          userId: (userId != "-1" ? userId : userAuth) || ""
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          _count: {
            select: {
              Comment: true,
              Like: true,
            },
          },
        },
      });
      return NextResponse.json(posts);
    }

    let posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            Comment: true,
            Like: true,
          },
        },
      },
    });
    posts = posts.map((post) => {
      return { ...post, logged: userId == post.userId };
    });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json(err);
  }
}

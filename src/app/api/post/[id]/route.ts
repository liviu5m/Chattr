import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {

  const {content, url} = await request.json();

  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        content,
        url
      }
    });
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(err);
  }
}

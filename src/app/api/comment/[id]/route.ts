import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {

  const {content} = await request.json();

  try {
    const comment = await prisma.comment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        content,
      }
    });
    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const comment = await prisma.comment.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json(err);
  }
}

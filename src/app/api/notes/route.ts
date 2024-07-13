import prisma from "@/lib/db/db";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parasResult = createNoteSchema.safeParse(body);

    if (!parasResult.success) {
      console.log(parasResult.error);

      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }
    const { title, content } = parasResult.data;
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Problem" });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parasResult = updateNoteSchema.safeParse(body);

    if (!parasResult.success) {
      console.log(parasResult.error);

      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }
    const { id, title, content } = parasResult.data;
    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return NextResponse.json({ error: "Note Not Found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== note.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updateNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({ updateNote }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Problem" });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const parasResult = deleteNoteSchema.safeParse(body);

    if (!parasResult.success) {
      console.log(parasResult.error);

      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }
    const { id } = parasResult.data;
    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return NextResponse.json({ error: "Note Not Found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== note.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await prisma.note.delete({ where: { id } });

    return NextResponse.json({ message: "Note Detele" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Problem" });
  }
}

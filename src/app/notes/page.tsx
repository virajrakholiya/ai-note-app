import Note from "@/components/Note";
import prisma from "@/lib/db/db";
import { auth } from "@clerk/nextjs/server";
import React from "react";

async function NotesPage() {
  const { userId } = auth();

  if (!userId) throw Error("userId undefined");

  const allNotes = await prisma.note.findMany({ where: { userId } });
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allNotes.map((item) => {
        return <Note note={item} key={item.id}></Note>;
      })}
    </div>
  );
}

export default NotesPage;

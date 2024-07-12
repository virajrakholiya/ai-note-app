'use client'
import React, { useState } from "react";
import { Note as Notemodal } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import AddNoteDialog from "./AddNoteDialog";

interface NotesProps {
  note: Notemodal;
}

function Note({ note }: NotesProps) {
    const [showEditDialog, setShowEditDialog] = useState(false)
  const wasUpdated = note.updatedAt > note.createdAt;

  const timestamp = (wasUpdated ? note.updatedAt : note.createdAt).toDateString();
  return <div>
    <Card className="cursor-pointer transition-shadow  hover:shadow-lg" onClick={()=>{
        setShowEditDialog(true)
    }}>
        <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>{timestamp}{wasUpdated&&" (updated)"}</CardDescription>
        </CardHeader>
        <CardContent><p className="whitespace-pre-line">{note.content}</p></CardContent>
    </Card>
    <AddNoteDialog open={showEditDialog} setOpen={setShowEditDialog}
    
    noteToEdit={note}>

    </AddNoteDialog>
  </div>;
}

export default Note;

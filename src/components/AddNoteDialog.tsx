import { createNoteSchema, CreateNoteSchema } from "@/lib/validation/note";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./ui/loading-button";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import { useState } from "react";

interface AddNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
}

function AddNoteDialog({ open, setOpen, noteToEdit }: AddNoteDialogProps) {
  const [deleteInProgress, setInProgress] = useState(false);
  const router = useRouter();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });
  async function onSubmit(input: CreateNoteSchema) {
    try {
      if (noteToEdit) {
        const res = await fetch("/api/notes", {
          method: "PUT",
          body: JSON.stringify({
            id: noteToEdit.id,
            ...input,
          }),
        });
        if (!res.ok) {
          Error("Status Code " + res.status);
        }
      } else {
        const res = await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(input),
        });

        if (!res.ok) {
          Error("Status Code " + res.status);
        }

        form.reset();
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      alert("Something Was Wrong Plz Try Again Later");
    }
  }
  async function deleteNote() {
    if (!noteToEdit) return;
    setInProgress(true);
    const res = await fetch("/api/notes", {
      method: "DELETE",
      body: JSON.stringify({ id: noteToEdit.id }),
    });
    try {
    } catch (error) {
      alert("Something Was Wrong Plz Try Again Later");
    } finally {
      setInProgress(false);
    }
    form.reset();
    router.refresh();
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>{noteToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Note Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Note Content" {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <DialogFooter className="flex gap-1 sm:gap-0">
              {noteToEdit && (
                <LoadingButton
                  variant={"destructive"}
                  loading={deleteInProgress}
                  disabled={form.formState.isSubmitting}
                  onClick={deleteNote}
                  type="button"
                >
                  Detele
                </LoadingButton>
              )}
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={deleteInProgress}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNoteDialog;

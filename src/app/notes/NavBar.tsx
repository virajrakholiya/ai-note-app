"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddNoteDialog from "@/components/AddNoteDialog";
import ThemeButton from "../ThemeButton";
import { useTheme } from "next-themes";

function NavBar() {
  const {theme} = useTheme()
  const [showDialog, setshowDialog] = useState(false);
  return (
    <>
      <div className="p-4 shadow gap-3 flex flex-wrap items-center justify-between m-auto max-w-full">
        <Link href="/notes" className="flex gap-1 items-center">
          <Image src={logo} alt="Note" width={35} height={35} />
          <span className="font-medium">Note Write</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeButton />
          <Button onClick={()=>{
            setshowDialog(true)
          }}>
            <Plus />
            Add Note
          </Button>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: "2.5rem",
                  width: "2.5rem",
                },
              },
            }}
          />
        </div>
      </div>
      {showDialog && <AddNoteDialog open={showDialog} setOpen={setshowDialog} />}{" "}
    </>
  );
}

export default NavBar;

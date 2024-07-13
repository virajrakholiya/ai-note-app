import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import bg from "@/assets/img.svg";
import logo from "@/assets/logo.png";

function Home() {
  const { userId } = auth();

  if (userId) redirect("/notes");

  return (
    <>
      <div className="flex flex-row justify-between items-center p-4">
        {" "}
        <div className="flex flex-row items-center">
          <Image src={logo} alt="Note" width={35} height={35} />
          <span className="font-medium">Note Write</span>
        </div>
        <div className="hidden md:block">
            <Link href={"/notes"}>
              <Button>Sign Up</Button>
            </Link>
          </div>
      </div>
      <div className="md:h-[85vh]  flex items-center justify-between p-5 flex-col-reverse md:flex-row gap-10">
        <div className="md:w-1/2 flex flex-col gap-5">
          <h1 className="text-3xl md:text-6xl font-bold">Take Notes with Ease</h1>
          <p>
            Notepad Pro is the ultimate note-taking app for busy professionals.
            Organize your thoughts, capture ideas, and stay on top of your tasks
            with our intuitive and feature-rich platform.
          </p>
          <div className="">
            <Link href={"/notes"}>
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
        <div>
          <Image src={bg} width={500} height={700} alt="image" />
        </div>
      </div>
    </>
  );
}

export default Home;

import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

function Home() {
  const { userId } = auth();

  if (userId) redirect("/notes");

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Link href={"/notes"}>
        {" "}
        <Button>Open</Button>
      </Link>
    </div>
  );
}

export default Home;

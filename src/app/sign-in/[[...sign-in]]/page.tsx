import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-[100vh] bg-black">
      <SignIn />
    </div>
  );
}

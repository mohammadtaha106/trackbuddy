import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth, signOut } from "../../auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Welcome to TrackBuddy!</h1>

      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">Sign Out</Button>
        </form>
      ) : (
        <Link href={"/signin"}>
          <Button>Sign In</Button>
        </Link>
      )}
    </div>
  );
}
      
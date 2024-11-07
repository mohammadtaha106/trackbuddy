import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth, signOut } from "../../auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen">
      <h1 className="font-bold text-3xl p-20 text-center">Welcome to tracknuddy</h1>
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
      
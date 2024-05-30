import Image from "next/image";
import Link from "next/link";
import { DropDownMenu } from "./dropDownMenu";
import { getServerAuthSession } from "@/server/auth";

export async function Navbar() {
  const session = await getServerAuthSession();
  const userName = session ? session.user?.name : "Sign in";

  return (
    <nav className="sticky top-0 w-full px-1 sm:px-10">
      <div className="flex w-full items-center justify-between py-4">
        <div className="flex flex-row justify-start">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-4xl font-semibold"
          >
            <span className="h-fit w-fit text-primary">Ripple</span>
          </Link>
        </div>
        <div className="hidden flex-row gap-4 sm:flex md:gap-20">
          <Link href="/" className="text-xl font-semibold hover:text-primary">
            SearchIN
          </Link>
          <Link href="/" className="text-xl font-semibold hover:text-primary">
            Influencers
          </Link>
          <Link href="/" className="text-xl font-semibold hover:text-primary">
            Chat
          </Link>
        </div>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="hidden text-xl hover:text-primary sm:block"
        >
          {userName}
        </Link>
        {userName && (
          <DropDownMenu userName={userName} session={session ? true : false} />
        )}
      </div>
    </nav>
  );
}

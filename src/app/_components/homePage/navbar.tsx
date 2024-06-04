import { ADMINS } from "@/constants";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";
import { DropDownMenu } from "./dropDownMenu";

export async function Navbar() {
  const session = await getServerAuthSession();
  const userName = session ? session.user?.name : "Sign in";
  const isAdmin = session?.user?.email && ADMINS.includes(session.user.email);
  return (
    <nav className="sticky top-0 z-50 w-full bg-white px-1 sm:px-10">
      <div className="flex w-full items-center justify-between py-4">
        <div className="flex flex-row justify-start gap-4">
          <Image src="/logo1.png" alt="logo" width={90} height={90} />
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-4xl font-semibold"
          >
            <span className="h-fit w-fit text-5xl text-primary">Ripple</span>
          </Link>
        </div>
        <div className="hidden flex-row gap-4 sm:flex md:gap-20">
          <Link
            href="/influencers/interactiveSearch"
            className="text-xl font-semibold hover:text-primary"
          >
            SearchIN
          </Link>
          <Link
            href="/influencers"
            className="text-xl font-semibold hover:text-primary"
          >
            Influencers
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="text-xl font-semibold hover:text-primary"
            >
              Admin Section
            </Link>
          )}
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

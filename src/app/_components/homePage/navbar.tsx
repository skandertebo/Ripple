import Image from "next/image";
import Link from "next/link";
import { DropDownMenu } from "./dropDownMenu";

export function Navbar() {
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
          <Link href="/" className="text-xl font-semibold">
            SearchIN
          </Link>
          <Link href="/" className="text-xl font-semibold">
            Influencers
          </Link>
          <Link href="/" className="text-xl font-semibold">
            Chat
          </Link>
        </div>
        <Link href="/" className=" hidden text-xl sm:block">
          login
        </Link>
        <DropDownMenu />
      </div>
    </nav>
  );
}

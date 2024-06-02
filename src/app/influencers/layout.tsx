import Image from "next/image";
import Link from "next/link";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiMartiniBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { GoBell } from "react-icons/go";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="navbar flex w-full bg-slate-100">
      <div className="bg-white sticky top-0 h-dvh w-20 border-2 ">
        <ul>
          <li>
            <Image
              src="/logo1.png"
              alt="logo"
              width={60}
              height={60}
              className="m-auto mt-4"
            ></Image>
          </li>
          <li className="mt-20">
            <Link href="/" className="">
              <BiMessageSquareDetail className="m-auto mb-8 rounded-md bg-primary/[.06] p-0.5 text-4xl text-primary"></BiMessageSquareDetail>
            </Link>
          </li>
          <li>
            <Link href="/influencer">
              <PiMartiniBold className="text-gray-400 m-auto mb-8 rounded-md p-0.5 text-4xl"></PiMartiniBold>
            </Link>
          </li>
          <li>
            <Link href="/influencer">
              <FaRegCircleUser className="text-gray-400 m-auto mb-8 rounded-md p-0.5 text-4xl"></FaRegCircleUser>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar flex-1">
        <div className="sticky bg-white top-0 ml-[-2px] h-16 w-full border-2 pt-4 text-xl">
          <div className="relative flex flex-row align-middle">
            <Link href="/" className="ml-12 flex size-fit gap-1 self-center ">
              <IoIosArrowBack className="mt-1 "></IoIosArrowBack>
              Home
            </Link>
            <GoBell className="absolute right-8 float-right   self-center  rounded-md text-3xl"></GoBell>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

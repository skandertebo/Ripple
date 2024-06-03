"use client";
import Image from "next/image";
import Link from "next/link";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiMartiniBold } from "react-icons/pi";
import { usePathname } from "next/navigation";
import User from "./user";
import { useState } from "react";

export interface SideBarProps {
  name: string;
  email: string;
  image: string;
}

export default function SideBar({ name, email, image }: SideBarProps) {
  const pathname = usePathname();
  const [showUser, setShowUser] = useState(false);
  return (
    <div className="sticky top-0 h-dvh w-20 overflow-visible border-2 bg-white ">
      <ul className="overflow-visible">
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
          <Link href="/influencers">
            <PiMartiniBold
              className={`m-auto mb-8 rounded-md p-0.5 text-4xl ${
                pathname === "/influencers"
                  ? "bg-primary/[.06] text-primary"
                  : "text-gray-400"
              }`}
            ></PiMartiniBold>
          </Link>
        </li>
        <li>
          <Link href="/influencers/interactiveSearch" className="">
            <BiMessageSquareDetail
              className={`m-auto mb-8 rounded-md p-0.5 text-4xl ${
                pathname === "/influencers/interactiveSearch"
                  ? "bg-primary/[.06] text-primary"
                  : "text-gray-400"
              }`}
            ></BiMessageSquareDetail>
          </Link>
        </li>
        <li className="relative overflow-visible">
          <FaRegCircleUser
            className="m-auto mb-8 cursor-pointer rounded-md p-0.5 text-4xl text-gray-400"
            onClick={() => setShowUser(!showUser)}
          ></FaRegCircleUser>
          <User name={name} email={email} image={image} showUser={showUser} />
        </li>
      </ul>
    </div>
  );
}

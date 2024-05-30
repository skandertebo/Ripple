"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

export function DropDownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const showMenu = isOpen ? "block" : "hidden";
  return (
    <div className="z-100 relative block w-fit cursor-pointer pr-8 sm:hidden">
      <IoMenu
        className={"text-4xl" + (isOpen ? " text-primary" : " text-black")}
        onClick={toggleMenu}
      />
      <div
        className={
          "z-100 bg-third absolute -right-1 top-10 px-3 py-4 text-2xl " +
          showMenu
        }
      >
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-xl font-semibold hover:text-primary">
            SearchIN
          </Link>
          <Link href="/" className="text-xl font-semibold hover:text-primary">
            Influencers
          </Link>
          <Link href="/" className="text-xl font-semibold hover:text-primary">
            Chat
          </Link>
          <Link href="/" className="text-xl font-semibold hover:text-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiMartiniBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { GoBell } from "react-icons/go";


const NavBar = () => {
    return (
        <nav className="flex flex-row">
            <div className="w-20 h-dvh border-2 ">
                <ul>
                    <li>
                        <Image src='/logo1.png' alt="logo" width={60} height={60} className="m-auto mt-4">
                        </Image>
                    </li>
                    <li className="mt-20">
                    <Link href="/" className="">
                        <BiMessageSquareDetail className="text-4xl m-auto text-blue p-0.5 bg-blue/[.06] rounded-md mb-8"></BiMessageSquareDetail>
                    </Link>
                    </li>
                    <li>
                    <Link href="/influencer">
                        <PiMartiniBold className="text-4xl m-auto text-gray-400 p-0.5 rounded-md mb-8"></PiMartiniBold>
                    </Link>
                    </li>
                    <li>
                    <Link href="/influencer">
                        <FaRegCircleUser className="text-4xl m-auto text-gray-400 	 p-0.5 rounded-md mb-8"></FaRegCircleUser>
                    </Link>
                    </li>

                </ul>
            </div>
            <div className="relative flex flex-row border-2 h-16 ml-[-2px] w-full align-middle text-xl">
                <Link href="/" className="flex self-center ml-12 size-fit gap-1 ">
                    <IoIosArrowBack className="mt-1 "></IoIosArrowBack>
                    Home
                </Link>
                <GoBell className="absolute right-8 text-3xl   rounded-md  float-right self-center"></GoBell>
            </div>
        </nav>
    );
};

export default NavBar;
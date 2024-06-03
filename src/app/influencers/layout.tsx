import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import SideBar, { type SideBarProps } from "../_components/utils/sideBar";
import { getServerAuthSession } from "@/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  let user: SideBarProps = {
    name: "",
    email: "",
    image: "/logo1.png",
  };
  if (session && session.user) {
    user = {
      name: session.user.name ? session.user.name : "user name",
      email: session.user.email ? session.user.email : "user email",
      image: session.user.image ? session.user.image : "/logo1.png",
    };
  }
  return (
    <div className="flex w-full">
      <SideBar name={user.name} email={user.email} image={user.image} />
      <div className="flex-1">
        <div className="sticky top-0 ml-[-2px] h-16 w-full border-2 bg-white pt-4 text-xl">
          <div className="relative flex flex-row align-middle">
            <Link href="/" className="ml-12 flex size-fit gap-1 self-center ">
              <IoIosArrowBack className="mt-1 "></IoIosArrowBack>
              Home
            </Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

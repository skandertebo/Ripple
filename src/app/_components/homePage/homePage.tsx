import { HomeMainComponent } from "./homeMainComponent";
import { Navbar } from "./navbar";

export function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />
      <HomeMainComponent />
      <div className="-z-10 mx-auto hidden h-full w-fit flex-row gap-[0px] md:flex">
        <div className="mt-[45%] h-full w-24 animate-moveUpDown1 rounded-lg border-[1px] border-black ease-in-out"></div>
        <div className="mt-[50%] h-full w-24 animate-moveUpDown2 rounded-lg border-[1px] border-black ease-in-out"></div>
        <div className="mt-[30%] h-full w-24 animate-moveUpDown3 rounded-lg border-[1px] border-black ease-in-out"></div>
        <div className="mt-[25%] h-full w-24 animate-moveUpDown4 rounded-lg border-[1px] border-black ease-in-out"></div>
        <div className="mt-[10%] h-full w-24 animate-moveUpDown5 rounded-lg border-[1px] border-black ease-in-out"></div>
        <div className="mt-[20%] h-full w-24 animate-moveUpDown6 rounded-lg border-[1px] border-black ease-in-out"></div>
        <div className="mt-[30%] h-full w-24 animate-moveUpDown7 rounded-lg border-[1px] border-black ease-in-out"></div>
        <div className="mt-[40%] h-full w-24 animate-moveUpDown8 rounded-lg border-[1px] border-black ease-in-out"></div>
      </div>
    </div>
  );
}

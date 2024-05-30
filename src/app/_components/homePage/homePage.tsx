import { HomeMainComponent } from "./homeMainComponent";
import { Navbar } from "./navbar";

export function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />
      <HomeMainComponent />
      <div className="mx-auto hidden h-full w-fit flex-row gap-[0px] md:flex">
        <div className="border-black animate-moveUpDown1 mt-[45%] h-full w-24 rounded-lg border-[1px] ease-in-out"></div>
        <div className="border-black animate-moveUpDown2 mt-[50%] h-full w-24 rounded-lg border-[1px] ease-in-out"></div>
        <div className="border-black animate-moveUpDown3 mt-[30%] h-full w-24 rounded-lg border-[1px] ease-in-out"></div>
        <div className="border-black animate-moveUpDown4 mt-[25%] h-full w-24 rounded-lg border-[1px] ease-in-out"></div>
        <div className="border-black animate-moveUpDown5 mt-[10%] h-full w-24 rounded-lg border-[1px] ease-in-out"></div>
        <div className="border-black animate-moveUpDown6 mt-[20%] h-full w-24 rounded-lg border-[1px] ease-in-out"></div>
        <div className="border-black animate-moveUpDown7 mt-[30%] h-full w-24 rounded-lg border-[1px] ease-in-out"></div>
        <div className="border-black animate-moveUpDown8 mt-[40%] h-full w-24 rounded-lg border-[1px] ease-in-out"></div>
      </div>
    </div>
  );
}

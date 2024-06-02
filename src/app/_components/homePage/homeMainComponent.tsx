import Link from "next/link";
export function HomeMainComponent() {
  return (
    <div className="absolute -z-10 w-full p-4 md:left-[20%] md:top-[30%] md:w-[60%] md:p-0">
      <p className="mb-4 text-3xl font-semibold md:text-5xl">
        Unlock Your Competitive Edge With
      </p>
      <p className="text-3xl font-bold text-primary md:text-6xl">Ripple</p>
      <div className="mt-16 flex w-full flex-row justify-start gap-4 text-xl md:gap-24 md:text-4xl">
        <Link
          href={"/"}
          className="flex cursor-pointer flex-row rounded-3xl bg-black px-5 py-2 font-semibold text-white"
        >
          <div className=" mr-3 mt-[1px] h-9 w-9 rounded-full bg-white text-center">
            <div className="mx-auto ml-[8px] mt-[8px] h-[20px] w-[20px] rounded-full bg-black"></div>
          </div>
          <p className="w-fit">Get Started</p>
        </Link>
        <Link
          href={"/"}
          className="flex cursor-pointer flex-row rounded-3xl bg-secondary px-5 py-2 font-semibold text-white"
        >
          <div className=" mr-3 mt-[1px] h-9 w-9 rounded-full bg-white text-center">
            <div className="mx-auto ml-[8px] mt-[8px] h-[20px] w-[20px] rounded-full bg-third"></div>
          </div>
          <p className="w-fit">Learn More</p>
        </Link>
      </div>
    </div>
  );
}

import SearchHistoryElement from "./searchHistoryElement";

export default function SearchHistory() {
  return (
    <div className="border-r-1 -mt-16 hidden h-screen w-[20%] overflow-y-scroll border-gray-300 bg-white pt-20 md:block">
      {/* New Search Button */}
      <div className="mx-auto flex w-4/5 cursor-pointer flex-row justify-between rounded-md border-2 border-gray-300 p-2 hover:border-primary">
        <p className=" mt-1 text-2xl font-semibold">New Search</p>
        <div className=" flex h-10 w-10 flex-col items-center justify-center rounded-lg border-2 border-primary text-center text-5xl text-primary">
          +
        </div>
      </div>
      {/* Search History List */}
      <div className="mx-auto mt-12 flex w-11/12 flex-col gap-2">
        <SearchHistoryElement />
        <SearchHistoryElement />
        <SearchHistoryElement />
        <SearchHistoryElement />
        <SearchHistoryElement />
        <SearchHistoryElement />
      </div>
    </div>
  );
}

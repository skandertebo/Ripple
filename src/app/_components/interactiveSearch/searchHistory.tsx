"use client";
import { type ISearch } from "@/models/search.model";
import SearchHistoryElement from "./searchHistoryElement";
import { useState } from "react";
import { api } from "@/trpc/react";
import { AiOutlineLoading } from "react-icons/ai";

interface SearchHistoryProps {
  searchHistory: ISearch[];
  onNewClick: (search: ISearch) => void;
  onSearchSelect: (search: ISearch) => void;
  setSearches: React.Dispatch<React.SetStateAction<ISearch[]>>;
}

export default function SearchHistory({
  searchHistory,
  onNewClick,
  onSearchSelect,
  setSearches,
}: SearchHistoryProps) {
  const [loading, setLoading] = useState(false);
  const onDelete = (search: ISearch) => {
    setSearches((prev) => prev.filter((s) => s._id !== search._id));
  };
  const searchMutation = api.search.create.useMutation({
    onSuccess: (data) => {
      if (!data) {
        console.error("No data returned from the mutation");
        setLoading(false);
        return;
      }
      setSearches((prev) => [data, ...prev]);
      setLoading(false);
      const newSearch: ISearch = data;
      onNewClick(newSearch);
    },
    onError: () => {
      setLoading(false);
    },
  });
  const onNewSearchClick = () => {
    setLoading(true);
    searchMutation.mutate({ name: "New Search" });
  };
  return (
    <div className="border-r-1 -mt-16 hidden h-screen w-[20%] overflow-y-scroll border-gray-300 bg-white pt-20 md:block">
      {/* New Search Button */}
      <div
        className="mx-auto flex w-4/5 cursor-pointer flex-row justify-between rounded-md border-2 border-gray-300 p-2 hover:border-primary"
        onClick={onNewSearchClick}
      >
        <p className=" mt-1 text-2xl font-semibold">New Search</p>
        <div className=" h-fit rounded-lg border-2 border-primary px-1 pb-[3px] text-center text-5xl text-primary">
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <AiOutlineLoading className="h-8 w-7 animate-spin text-primary" />
            </div>
          ) : (
            <div className="h-fit w-fit p-0 leading-[35px]">+</div>
          )}
        </div>
      </div>
      {/* Search History List */}
      <div className="mx-auto mt-12 flex w-11/12 flex-col gap-2">
        {searchHistory.map((search, index) => (
          <SearchHistoryElement
            key={index}
            search={search}
            onDelete={onDelete}
            onSearchSelect={onSearchSelect}
          />
        ))}
      </div>
    </div>
  );
}

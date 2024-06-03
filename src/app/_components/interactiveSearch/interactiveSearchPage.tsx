"use client";
import { type ISearch } from "@/models/search.model";
import InteractiveSearch from "./interactiveSearch";
import SearchHistory from "./searchHistory";
import { useState } from "react";
interface InteractiveSearchProps {
  searchHistory: ISearch[];
}

export default function InteractiveSearchPage({
  searchHistory,
}: InteractiveSearchProps) {
  const [searches, setSearches] = useState<ISearch[]>(searchHistory);
  const [currentSearch, setCurrentSearch] = useState<ISearch | null>(null);
  const onSearchSelect = (search: ISearch) => {
    console.log("Search selected:", search);
    console.log("Current search:", currentSearch);
    if (search._id === currentSearch?._id) return;
    setCurrentSearch(search);
  };
  const onNewClick = (search: ISearch) => {
    setCurrentSearch(search);
  };
  return (
    <div className="flex flex-row bg-background">
      <SearchHistory
        searchHistory={searches}
        onNewClick={onNewClick}
        onSearchSelect={onSearchSelect}
        setSearches={setSearches}
      />
      <div className="-mt-16 h-screen flex-1 overflow-y-scroll pb-28 pt-16">
        <InteractiveSearch search={currentSearch} setSearches={setSearches} />
      </div>
    </div>
  );
}

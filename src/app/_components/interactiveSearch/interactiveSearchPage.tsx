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
  const [disabled, setDisabled] = useState<boolean>(true);
  const onSearchSelect = (search: ISearch) => {
    if (search === currentSearch) return;
    setCurrentSearch(search);
    setDisabled(true);
  };
  const onNewClick = (search: ISearch) => {
    setCurrentSearch(search);
    setDisabled(false);
  };
  return (
    <div className="flex flex-row bg-background">
      <SearchHistory
        searchHistory={searches}
        onNewClick={onNewClick}
        onSearchSelect={onSearchSelect}
        setSearches={setSearches}
      />
      <div className="relative -mt-16 h-screen flex-1 overflow-y-scroll pt-16">
        <InteractiveSearch
          disabled={disabled}
          search={currentSearch}
          setSearches={setSearches}
        />
      </div>
    </div>
  );
}

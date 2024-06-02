"use client";
import { type ISearch } from "@/models/search.model";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { api } from "@/trpc/react";

interface SearchHistoryElementProps {
  search: ISearch;
  onDelete: (search: ISearch) => void;
  onSearchSelect: (search: ISearch) => void;
}
export default function SearchHistoryElement({
  search,
  onDelete,
  onSearchSelect,
}: SearchHistoryElementProps) {
  const searchMutation = api.search.delete.useMutation();
  const onSearchDelete = () => {
    onDelete(search);
    if (!search._id) return;
    searchMutation.mutate({ searchId: search._id });
  };
  return (
    <div className="flex w-full flex-row justify-between rounded-md border-2 border-gray-300 px-2 py-2 hover:border-primary ">
      <p
        className="cursor-pointer text-xl hover:text-primary"
        onClick={() => onSearchSelect(search)}
      >
        {search.name}
      </p>
      <HiOutlineArchiveBox
        className="cursor-pointer text-2xl hover:text-primary"
        onClick={onSearchDelete}
      />
    </div>
  );
}

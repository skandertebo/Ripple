import { HiOutlineArchiveBox } from "react-icons/hi2";

export default function SearchHistoryElement() {
  return (
    <div className="flex w-full flex-row justify-between rounded-md border-2 border-gray-300 px-2 py-2 hover:border-primary ">
      <p className="cursor-pointer text-xl hover:text-primary">Cheese Farm</p>
      <HiOutlineArchiveBox className="cursor-pointer text-2xl hover:text-primary" />
    </div>
  );
}

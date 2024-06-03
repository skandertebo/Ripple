import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center py-28">
      <AiOutlineLoading className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

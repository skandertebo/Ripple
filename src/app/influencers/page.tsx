import { Suspense } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import DiscoverInfluencersWrapper from "../_components/discover-influencers/discover-influencers-wrapper";
import SearchFilters from "../_components/discover-influencers/search-filters";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const key = JSON.stringify(searchParams);
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="mx-6 mb-6 mt-4 flex flex-col gap-6 border-b border-slate-400 pb-4">
        <h1 className=" text-4xl font-bold">Discover Influencers</h1>
        <SearchFilters searchParams={searchParams} />
      </div>
      <Suspense
        key={key}
        fallback={
          <div className="mt-[160px] flex h-full w-full items-center justify-center">
            <AiOutlineLoading className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <DiscoverInfluencersWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

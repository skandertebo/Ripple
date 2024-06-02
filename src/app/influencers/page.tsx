import { Suspense } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import DiscoverInfluencersWrapper from "../_components/discover-influencers/discover-influencers-wrapper";

export default async function Page() {
  return (
    <div className="">
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <AiOutlineLoading className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <DiscoverInfluencersWrapper />
      </Suspense>
    </div>
  );
}

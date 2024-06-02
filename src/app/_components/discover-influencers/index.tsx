"use client";

import useScrollToBottom from "@/hooks/useScrollToBottom";
import type { IInfluencer } from "@/models/influencer.model";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import SuggestedCard from "../influencer/suggested-card";

export interface DiscoverInfluencersProps {
  initialInfluencers: IInfluencer[];
}

const DiscoverInfluencers: React.FC<DiscoverInfluencersProps> = ({
  initialInfluencers,
}) => {
  const [page, setPage] = useState<number>(1);
  const [influencers, setInfluencers] =
    useState<IInfluencer[]>(initialInfluencers);
  const { refetch, isLoading } = api.influencer.getAll.useQuery(
    {
      limit: 20,
      offset: page * 20,
    },
    { enabled: page > 1 },
  );

  useEffect(() => {
    if (page === 1) return;
    refetch().then((res) => {
      if (!res.data) return;
      setInfluencers((prev) => [...prev, ...(res.data as Array<IInfluencer>)]);
    });
  }, [page]);

  useScrollToBottom(() => {
    setPage((prev) => prev + 1);
  }, [page]);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {influencers.map((influencer, idx) => (
          <SuggestedCard key={idx} influencer={influencer} />
        ))}
      </div>
      {isLoading && (
        <div className="mt-2 flex w-full justify-center">
          <AiOutlineLoading className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default DiscoverInfluencers;

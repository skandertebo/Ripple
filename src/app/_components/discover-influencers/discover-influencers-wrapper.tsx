import { api } from "@/trpc/server";
import DiscoverInfluencers from ".";

export default async function DiscoverInfluencersWrapper({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const inputObject: {
    limit: number;
    offset: number;
    search?: string;
    platform?: "tiktok" | "instagram" | "youtube";
    minFollowers?: number;
  } = {
    limit: 20,
    offset: 0,
  };
  if (searchParams.search) {
    inputObject.search = searchParams.search;
  }
  if (
    searchParams.platform &&
    ["tiktok", "instagram", "youtube"].includes(searchParams.platform)
  ) {
    inputObject.platform = searchParams.platform as
      | "tiktok"
      | "instagram"
      | "youtube";
  }
  if (searchParams.minFollowers) {
    inputObject.minFollowers = parseInt(searchParams.minFollowers);
  }

  const initialInfluencers = await api.influencer.getAll(inputObject);
  return <DiscoverInfluencers initialInfluencers={initialInfluencers} />;
}

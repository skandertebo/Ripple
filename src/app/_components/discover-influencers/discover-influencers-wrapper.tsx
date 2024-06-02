import { api } from "@/trpc/server";
import DiscoverInfluencers from ".";

export default async function DiscoverInfluencersWrapper() {
  const initialInfluencers = await api.influencer.getAll({
    limit: 20,
    offset: 0,
  });
  return <DiscoverInfluencers initialInfluencers={initialInfluencers} />;
}

import InfluencerCard from "@/app/_components/influencer/influencer-card";
import InfluencerPage from "@/app/_components/influencer/influencer-page";
import { getSimilarInfluencers } from "@/trpc/getSimilarInfluencers";
import { api } from "@/trpc/server";

export interface SimilarInfluencer {
  id: string;
  score: number;
}



export default async function Page({ params }: { params: { id: string } }) {

  const influencer = await api.influencer.getOne(params.id);
  // const influencer = await api.influencer.findByUsername("shakira");
  console.log(params.id);
  console.log(influencer);
  const similar= await getSimilarInfluencers(params.id);
  // console.log(similar);
  const ids = similar.map((influencer: SimilarInfluencer) => influencer.id);
  // console.log(ids);
  const suggestedInfluencers = await api.influencer.getByIds(ids);
  console.log(suggestedInfluencers);
  
  return (
    <>
      <InfluencerPage
        influencer={influencer}
        suggestedInfluencers={suggestedInfluencers}
      />
    </>
  );
}

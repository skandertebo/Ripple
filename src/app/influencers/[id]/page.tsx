import InfluencerCard from "@/app/_components/influencer/influencer-card";
import InfluencerPage from "@/app/_components/influencer/influencer-page";
import { api } from "@/trpc/server";

interface SimilarInfluencer {
  id: string;
  score: number;
}

async function getSimilarInfluencers(id: string): Promise<SimilarInfluencer[]>{
  try {
    // Construct the URL with the influencer ID
    const url = `https://influencerapi.skandertebourbi.tech/search/similar/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch similar influencers: ${response.statusText}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching similar influencers:', error);
    return [];
  }
}

export default async function Page({ params }: { params: { id: string } }) {

  const influencer = await api.influencer.getOne(params.id);
  // const influencer = await api.influencer.findByUsername("shakira");
  console.log(params.id);
  console.log(influencer);
  // const similar: SimilarInfluencer[]= await getSimilarInfluencers(influencer.id);
  // console.log(similar);
  // const ids = similar.map((influencer: SimilarInfluencer) => influencer.id);
  // console.log(ids);
  // const suggestedInfluencers = await api.influencer.getByIds(ids);
  
  return (
    <>
      {/* <InfluencerPage
        influencer={influencer}
        suggestedInfluencers={}
      /> */}
      {/* <InfluencerCard influencer={influencer} /> */}
    </>
  );
}

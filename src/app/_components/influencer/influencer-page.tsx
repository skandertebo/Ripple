import type { InfluencerDto } from "@/service/dto/influencerDto";
import type { FC } from "react";
import InfluencerCard from "../../_components/influencer/influencer-card";
import SuggestedCard from "../../_components/influencer/suggested-card";

interface InfluencerPageProps {
  influencer: InfluencerDto;
  suggestedInfluencers: InfluencerDto[];
}

const InfluencerPage: FC<InfluencerPageProps> = ({
  influencer,
  suggestedInfluencers,
}) => {
  return (
    <div className="bg-slate-100 pt-6">
      <InfluencerCard influencer={influencer}/>
      <div className="container m-auto mt-6 p-5"> 
        <h1 className="font-bold text-2xl ml-6 ">Similar Influencers</h1>
        <div className="flex flex-wrap gap-5">

        {suggestedInfluencers.map((influencer, index) => (
            <SuggestedCard key={index} influencer={influencer} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default InfluencerPage;

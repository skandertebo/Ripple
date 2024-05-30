import { InfluencerDto } from "@/service/dto/influencerDto";
import { FC } from "react";
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
      <div className="container m-auto mt-8 rounded-2xl p-5"> 
        <h1 className="font-bold text-xl ml-2">Similar Influencers</h1>
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

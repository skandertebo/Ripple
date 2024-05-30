import { InfluencerDto } from "@/service/dto/influencerDto";
import { FC } from "react";
import InfluencerCard from "../_components/influencer/influencer-card";
import SuggestedCard from "../_components/influencer/suggested-card";

interface InfluencerPageProps {
  influencer: InfluencerDto;
  suggestedInfluencers: InfluencerDto[];
}

const InfluencerPage: FC<InfluencerPageProps> = ({
  influencer,
  suggestedInfluencers,
}) => {
  return (
    <div className="bg-slate-100">
      <InfluencerCard influencer={influencer} />
      <div className="container m-auto mt-10  rounded-2xl p-5"> 
        <h1 className="font-bold text-xl">Similar Influencers</h1>
        <div className="flex flex-wrap">

        {suggestedInfluencers.map((influencer, index) => (
            <SuggestedCard key={index} influencer={influencer} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default InfluencerPage;

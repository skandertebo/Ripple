import type { IInfluencer } from "@/models/influencer.model";
import InfluencerCard from "../../_components/influencer/influencer-card";
import SuggestedCard from "../../_components/influencer/suggested-card";

interface InfluencerPageProps {
  influencer: IInfluencer;
  suggestedInfluencers: IInfluencer[];
}

const InfluencerPage: React.FC<InfluencerPageProps> = ({
  influencer,
  suggestedInfluencers,
}) => {
  return (
    <div className="z-20 bg-slate-100 pt-6">
      <InfluencerCard influencer={influencer} />
      <div className="container m-auto mt-8 rounded-2xl p-5">
        <h1 className="ml-2 text-xl font-bold">Similar Influencers</h1>
        {suggestedInfluencers.length === 0 ? (
          <p className="m-4 text-2xl text-center text-primary">No similar influencers found</p>
        ) : (
          <div className="flex flex-wrap gap-5">
            {suggestedInfluencers.map((influencer, index) => (
        <SuggestedCard key={index} influencer={influencer} />
      ))}
    </div>
  )}
      </div>
    </div>
  );
};

export default InfluencerPage;

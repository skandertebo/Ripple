import { api } from "@/trpc/server";
import getTiktokMediaUrl from "@/utils/getTiktokStream";

export default async function Page() {
  const influencers = await api.influencer.getAll({ limit: 3, offset: 0 });
  return (
    <div className="">
      <h1>Influencers</h1>
      <ul>
        {
          // example of how to render the influencers
          influencers.map((influencer) => (
            <li key={influencer._id}>
              <div>
                <img
                  src={
                    influencer.avatar
                      ? getTiktokMediaUrl(influencer.avatar)
                      : "/logo.png"
                  }
                  alt={influencer.name}
                  width={100}
                  height={100}
                />
                <h2>{influencer.name}</h2>
                <p>{influencer.bio}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

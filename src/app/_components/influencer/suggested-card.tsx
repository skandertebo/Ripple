import Image from "next/image";
import type { InfluencerCardProps } from "./influencer-card";
import type { FC } from "react";
import {
  FaCheckCircle,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const SuggestedCard: FC<InfluencerCardProps> = ({ influencer }) => {
  return (
    <div className="container m-auto mt-10 bg-white w-72 rounded-2xl  border-2 p-5 text-center">
      <div className="float-left text-4xl">
        {influencer.platform === "TikTok" && (
          <FaTiktok className="tiktok-icon" />
        )}
        {influencer.platform === "YouTube" && (
          <FaYoutube className="youtube-icon" />
        )}
        {influencer.platform === "Instagram" && (
          <FaInstagram className="instagram-icon" />
        )}
      </div>
      <div className="influencer-pic">
        <Image
          src={influencer.avatar}
          alt="Influencer"
          className="influencer-pic ml-20 size-20 rounded-full "
          width={50}
          height={50}
        />
        <FaCheckCircle className="check-icon absolute ml-[140px] mt-[-24px] size-7 rounded-full  border-2 bg-white text-sky-500" />

        <div className="profile-info mt-3">
          <h2 className="text-blue ">@{influencer.name}</h2>
        </div>

        <div className="mt-3 text-xs text-neutral-600 ">{influencer.bio}</div>

        <div className="stats m-auto mt-3 flex w-9/12 gap-2 r text-sm font-semibold">
          <div>
            <h3>{influencer.stats.followerCount}</h3>
            <p className="text-xs font-extralight	text-neutral-400">Followers</p>
          </div>
          <div>
            <h3>{influencer.stats.followingCount}</h3>
            <p className="text-xs font-extralight	text-neutral-400">Following</p>
          </div>
          <div>
            <h3>{influencer.stats.postsCount}</h3>
            <p className="text-xs font-extralight text-neutral-400	">Posts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCard;

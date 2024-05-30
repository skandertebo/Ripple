"use client";
import {
  FaCheckCircle,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import { InfluencerDto } from "@/service/dto/influencerDto";
import { FC } from "react";

export interface InfluencerCardProps {
  influencer: InfluencerDto;
}

const InfluencerCard: FC<InfluencerCardProps> = ({ influencer }) => {
  return (
    <div className="container m-auto w-fit rounded-2xl border-2 p-6 bg-white">
      <div className="influencer-info flex flex-row text-center ">
        <div className="relative influencer-pic mr-6 -z-10">
          <Image
            src={influencer.avatar}
            alt="Influencer"
            className="influencer-pic size-24 rounded-full  "
            width={60}
            height={60}
          />
          <FaCheckCircle className="check-icon absolute	 ml-[70px] mt-[-24px] size-7	rounded-full  border-2 bg-white text-sky-500" />
        </div>

        <div className="header mt-2">
          <div className="float-right text-4xl">
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
          <div className="profile flex flex-row">
            <div className="profile-info">
              <h2 className="text-primary ">@{influencer.name}</h2>
              <p className="text-neutral-600">{influencer.username}</p>
            </div>
          </div>
          <div className="stats m-4 flex w-9/12 justify-between font-bold">
            <div className="flex gap-1">
              <h3>{influencer.stats.followerCount}</h3>
              <p className="font-extralight text-neutral-400	">Followers</p>
            </div>
            <div className="flex gap-1">
              <h3>{influencer.stats.followingCount}</h3>
              <p className="font-extralight text-neutral-400	">Following</p>
            </div>
            <div className="flex gap-1">
              <h3>{influencer.stats.postsCount}</h3>
              <p className="font-extralight text-neutral-400	">Posts</p>
            </div>
          </div>
          <div className="ml-4">{influencer.bio}</div>
        </div>
      </div>

      {/* <div className="categories mt-10 flex gap-4">
        {influencer.categories.map((category, index) => (
          <div
            key={index}
            className="category w-32 rounded-2xl border-2 text-center font-semibold"
          >
            {category}
            <p className="font-extralight text-neutral-400">20%</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default InfluencerCard;

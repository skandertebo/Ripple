"use client";
import type { IInfluencer } from "@/models/influencer.model";
import formatFollowersNumber from "@/utils/formatFollowersNumber";
import getTiktokMediaUrl from "@/utils/getTiktokStream";
import { useLayoutEffect, useRef } from "react";
import {
  FaCheckCircle,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

export interface InfluencerCardProps {
  influencer: IInfluencer;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer }) => {
  const avatarRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (avatarRef.current === null) return;
    avatarRef.current.onerror = () => {
      avatarRef.current!.src = "/logo.png";
    };
  }, []);

  return (
    <div className="w-fit rounded-2xl border-2 bg-white p-6">
      <div className="influencer-info flex flex-row text-center ">
        <div className="influencer-pic mr-6 ">
          <img
            src={
              influencer.platform?.toLowerCase() === "tiktok"
                ? getTiktokMediaUrl(influencer.avatar)
                : influencer.avatar
            }
            alt="Influencer"
            className="influencer-pic size-24 rounded-full"
            width={60}
            height={60}
            ref={avatarRef}
          />
          <FaCheckCircle className="check-icon absolute z-10 ml-[70px] mt-[-24px] size-7 rounded-full border-2 bg-white text-sky-500" />
        </div>

        <div className="header mt-2">
          <div className="float-right text-4xl">
            {influencer.platform?.toLowerCase() === "tiktok" && (
              <FaTiktok className="tiktok-icon" />
            )}
            {influencer.platform?.toLowerCase() === "youtube" && (
              <FaYoutube className="youtube-icon" />
            )}
            {influencer.platform?.toLowerCase() === "instagram" && (
              <FaInstagram className="instagram-icon" />
            )}
          </div>
          <div className="profile flex flex-row">
            <div className="profile-info">
              <h2 className="text-primary ">@{influencer.name}</h2>
              <p className="text-neutral-600">{influencer.username}</p>
            </div>
          </div>
          <div className="m-4 flex max-w-[250px] flex-wrap gap-x-8 font-bold sm:max-w-[350px]">
            <div className="flex gap-1">
              <h3>
                {formatFollowersNumber(
                  influencer.stats?.followerCount ?? "unknown",
                )}
              </h3>
              <p className="font-extralight text-neutral-400	">Followers</p>
            </div>
            <div className="flex gap-1">
              <h3>{influencer.stats?.followingCount ?? "unknown"}</h3>
              <p className="font-extralight text-neutral-400	">Following</p>
            </div>
            <div className="flex gap-1">
              <h3>{influencer.stats?.postsCount ?? "unknown"}</h3>
              <p className="font-extralight text-neutral-400	">Posts</p>
            </div>
          </div>
          <div className="ml-4 max-w-[250px] sm:max-w-[350px]">
            {influencer.bio.length > 100
              ? influencer.bio.slice(0, 100) + "..."
              : influencer.bio}
          </div>
        </div>
      </div>

      <div className="categories mt-10 flex gap-4">
        {influencer.categories.map((category, index) => (
          <div
            key={index}
            className="category w-32 rounded-2xl border-2 text-center font-semibold"
          >
            {category}
            <p className="font-extralight text-neutral-400">20%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfluencerCard;
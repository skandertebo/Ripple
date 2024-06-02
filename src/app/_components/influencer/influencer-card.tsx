"use client";
import type { IInfluencer } from "@/models/influencer.model";
import formatFollowersNumber from "@/utils/formatFollowersNumber";
import getTiktokMediaUrl from "@/utils/getTiktokStream";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import {
  FaCheckCircle,
} from "react-icons/fa";

export interface InfluencerCardProps {
  influencer: IInfluencer;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer }) => {
  const avatarRef = useRef<HTMLImageElement>(null);

  // useLayoutEffect(() => {
  //   if (avatarRef.current === null) return;
  //   avatarRef.current.onerror = () => {
  //     avatarRef.current!.src = "/logo.png";
  //   };
  // }, []);

  return (
<div className="container m-auto w-fit rounded-2xl border-2 p-6 bg-white">
      <div className="influencer-info flex flex-row text-center ">
        <div className=" influencer-pic mr-6 ">
          <Image
            src={influencer.avatar.replace("-sign-va",'')}
            alt="Influencer"
            className="influencer-pic size-24 rounded-full  "
            width={60}
            height={60}
          />
          <FaCheckCircle className="check-icon absolute	 ml-[70px] mt-[-24px] size-7	rounded-full  border-2 bg-white text-sky-500" />
        </div>

        <div className="header mt-2">
         <div className="float-right text-4xl">
            {influencer.platform === "tiktok" && (
              <Image src='/tiktok1.png' width={40} height={40} alt='insta' />
            )}
            {influencer.platform === "youtube" && (
              <Image src='/youtube.png' width={40} height={40} alt='insta' />
            )}
            {influencer.platform === "Instagram" && (
              <Image src='/insta.png' width={40} height={40} alt='insta' />
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
      {influencer.categories && (
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
      )}
    </div>
  );
};

export default InfluencerCard;

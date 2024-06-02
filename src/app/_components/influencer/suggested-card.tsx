"use client";

import formatFollowersNumber from "@/utils/formatFollowersNumber";
import getTiktokMediaUrl from "@/utils/getTiktokStream";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, type FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import type { InfluencerCardProps } from "./influencer-card";

const SuggestedCard: FC<InfluencerCardProps> = ({ influencer }) => {
  const avatarRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (avatarRef.current === null) return;
    avatarRef.current.onerror = () => {
      if (avatarRef.current) avatarRef.current.src = "/logo.png";
    };
  }, [avatarRef.current]);
  return (
    <Link href={`/influencers/${influencer._id}`}>
      <div className="container m-auto mt-10 h-72 w-72 rounded-2xl border-2 bg-white p-5 text-center">
        <div className="float-left text-4xl">
          {influencer.platform === "tiktok" && (
            <Image src="/tiktok1.png" width={30} height={30} alt="tiktok" />
          )}
          {influencer.platform === "youtube" && (
            <Image src="/youtube.png" width={30} height={30} alt="youtube" />
          )}
          {influencer.platform === "Instagram" && (
            <Image src="/insta.png" width={30} height={30} alt="insta" />
          )}
        </div>
        <div className="influencer-pic">
          <img
            src={
              influencer.platform === "tiktok"
                ? getTiktokMediaUrl(influencer.avatar)!
                : influencer.avatar
            }
            alt={influencer.name}
            className="influencer-pic ml-20 size-20 rounded-full "
            ref={avatarRef}
          />
          <FaCheckCircle className="check-icon absolute ml-[140px] mt-[-24px] size-7 rounded-full  border-2 bg-white text-sky-500" />

          <div className="profile-info mt-3">
            <h2 className="text-primary ">@{influencer.name}</h2>
          </div>

          <div className="m-auto mt-3 flex w-fit gap-2 text-sm font-semibold">
            <div>
              <h3>
                {formatFollowersNumber(
                  influencer.stats?.followerCount ?? "unknown",
                )}
              </h3>
              <p className="text-xs font-extralight	text-neutral-400">
                Followers
              </p>
            </div>
            <div>
              <h3>
                {formatFollowersNumber(
                  influencer.stats?.followingCount ?? "unknown",
                )}
              </h3>
              <p className="text-xs font-extralight	text-neutral-400">
                Following
              </p>
            </div>
            <div>
              <h3>
                {formatFollowersNumber(
                  influencer.stats?.postsCount ?? "unknown",
                )}
              </h3>
              <p className="text-xs font-extralight text-neutral-400	">Posts</p>
            </div>
          </div>
        </div>
        <div className="bio mt-3 text-xs text-neutral-600 ">
          {influencer.bio}
        </div>

        <style jsx>
          {`
            .bio {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              max-height: 4.5em; /* Assuming approximately 1.5em per line */
            }
          `}
        </style>
      </div>
    </Link>
  );
};

export default SuggestedCard;

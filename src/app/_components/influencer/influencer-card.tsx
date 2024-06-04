"use client";
import type { IInfluencer } from "@/models/influencer.model";
import formatFollowersNumber from "@/utils/formatFollowersNumber";
import getTiktokMediaUrl from "@/utils/getTiktokStream";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { FaCheckCircle, FaLink } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import getInfluencerLink from "../utils/getInfluencerLink";

export interface InfluencerCardProps {
  influencer: IInfluencer;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer }) => {
  const avatarRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (avatarRef.current === null) return;
    avatarRef.current.onerror = () => {
      if (avatarRef.current) avatarRef.current.src = "/logo.png";
    };
  }, [avatarRef.current]);

  console.log(influencer.category);

  return (
    <div className="m-auto w-fit rounded-2xl border-2 bg-white p-8">
      <div className="flex flex-row text-center ">
        <div className="mr-6 ">
          <img
            src={
              influencer.platform === "tiktok"
                ? getTiktokMediaUrl(influencer.avatar)!
                : influencer.avatar
            }
            alt="Influencer"
            className="size-24 rounded-full"
            ref={avatarRef}
            width={60}
            height={60}
          />

          <FaCheckCircle className="absolute ml-[70px] mt-[-24px] size-7	rounded-full  border-2 bg-white text-sky-500" />
        </div>

        <div className="mt-2">
          <Link href={getInfluencerLink(influencer)} target="_blank">
            <div className="float-right text-4xl">
              {influencer.platform === "tiktok" && (
                <Image src="/tiktok1.png" width={40} height={40} alt="tiktok" />
              )}
              {influencer.platform === "youtube" && (
                <Image
                  src="/youtube.png"
                  width={40}
                  height={40}
                  alt="youtube"
                />
              )}
              {influencer.platform === "Instagram" && (
                <Image src="/insta.png" width={40} height={40} alt="insta" />
              )}
            </div>
          </Link>
          <div className="profile flex flex-row">
            <div className="profile-info">
              <h2 className="text-primary ">@{influencer.name}</h2>
              <p className="text-neutral-600">{influencer.username}</p>
            </div>
          </div>
          <div className="m-4 flex w-9/12 justify-between gap-4 font-bold">
            <div className="flex gap-1">
              <h3>
                {formatFollowersNumber(
                  influencer.stats?.followerCount ?? "unknown",
                )}
              </h3>
              <p className="font-extralight text-neutral-400	">Followers</p>
            </div>
            <div className="flex gap-1">
              <h3>
                {formatFollowersNumber(
                  influencer.stats?.followingCount ?? "unknown",
                )}
              </h3>
              <p className="font-extralight text-neutral-400">Following</p>
            </div>
            <div className="flex gap-1">
              <h3>
                {formatFollowersNumber(
                  influencer.stats?.postsCount ?? "unknown",
                )}
              </h3>
              <p className="font-extralight text-neutral-400">Posts</p>
            </div>
          </div>
          <div className="bio ml-4 max-w-5xl break-words">{influencer.bio}</div>
        </div>
      </div>
      {influencer.category && (
        <div className="mt-10 flex gap-4">
          <Link
            href={`/influencers?category=${encodeURIComponent(influencer.category)}`}
            key={influencer.category}
            className="w-32  rounded-xl border-2 text-center font-semibold"
          >
            {influencer.category}
          </Link>
        </div>
      )}
      <div className="contact mt-4 flex gap-10">
        {influencer.contact.email.length > 0 && (
          <div className="email mt-4 flex gap-2">
            <MdOutlineMail className="email-icon text-2xl text-primary" />
            <div>
              {influencer.contact.email.map((email, index) => (
                <span
                  className="block font-extralight text-neutral-500"
                  key={index}
                >
                  {email}
                </span>
              ))}
            </div>
          </div>
        )}
        {influencer.contact.phone.length > 0 && (
          <div className="email mt-4 flex gap-2">
            <FiPhone className="email-icon text-2xl text-primary" />
            <div>
              {influencer.contact.phone.map((phone, index) => (
                <span
                  className="block font-extralight text-neutral-500"
                  key={index}
                >
                  {phone}
                </span>
              ))}
            </div>
          </div>
        )}
        {influencer.contact.url.length > 0 && (
          <div className="email mt-4 flex gap-2">
            <FaLink className="email-icon text-2xl text-primary" />
            <div>
              {influencer.contact.url.map((url, index) => (
                <span
                  className="block font-extralight text-neutral-500"
                  key={index}
                >
                  {url}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerCard;

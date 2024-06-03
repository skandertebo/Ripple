"use client";
import type { IInfluencer } from "@/models/influencer.model";
import formatFollowersNumber from "@/utils/formatFollowersNumber";
import getTiktokMediaUrl from "@/utils/getTiktokStream";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaLink } from "react-icons/fa";

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
          <div className="float-right text-4xl">
            {influencer.platform === "tiktok" && (
              <Image src="/tiktok1.png" width={40} height={40} alt="insta" />
            )}
            {influencer.platform === "youtube" && (
              <Image src="/youtube.png" width={40} height={40} alt="insta" />
            )}
            {influencer.platform === "Instagram" && (
              <Image src="/insta.png" width={40} height={40} alt="insta" />
            )}
          </div>
          <div className="profile flex flex-row">
            <div className="profile-info">
              <h2 className="text-primary ">@{influencer.name}</h2>
              <p className="text-neutral-600">{influencer.username}</p>
            </div>
          </div>
          <div className="m-4 flex w-9/12 justify-between font-bold gap-4">
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
          <div className="bio break-words max-w-5xl ml-4">{influencer.bio}</div>
        </div>
      </div>
      {influencer.category && (
        <div className="mt-10 flex gap-4">
          {influencer.category.split('&').map((category, index) => (
            <Link href={`/influencers?category=${category.trim()}`}
              key={index}
              className="w-32  rounded-xl border-2 text-center font-semibold">
              {category.trim()}
            </Link>
          ))}
        </div>
      )}
      <div className="flex gap-10 mt-4 contact">
        {influencer.contact.email.length>0 && (
          <div className="flex email mt-4 gap-2">
            <MdOutlineMail className="email-icon text-primary text-2xl" />
            <div>
              {influencer.contact.email.map((email, index) => (
                <span className="font-extralight block text-neutral-500" key={index}>{email}</span>
              ))}
            </div>
          </div>
        )}
        {influencer.contact.phone.length>0  && (
           <div className="flex email mt-4 gap-2">
            <FiPhone className="email-icon text-primary text-2xl" />
            <div>
              {influencer.contact.phone.map((phone, index) => (
                <span className="font-extralight block text-neutral-500" key={index}>{phone}</span>
              ))}
            </div>
          </div>
        )}
        {influencer.contact.url.length>0  && (
          <div className="flex email mt-4 gap-2">
            <FaLink className="email-icon text-primary text-2xl"/>
            <div>
              {influencer.contact.url.map((url, index) => (
                <span className="font-extralight block text-neutral-500" key={index}>{url}</span>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default InfluencerCard;

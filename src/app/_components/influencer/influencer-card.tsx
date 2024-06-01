"use client";
import {
  FaCheckCircle,
} from "react-icons/fa";
import Image from "next/image";
import type { InfluencerDto } from "@/service/dto/influencerDto";
import type { FC } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";



export interface InfluencerCardProps {
  influencer: InfluencerDto;
}

const InfluencerCard: FC<InfluencerCardProps> = ({ influencer }) => {
  return (
    <div className="container m-auto w-fit rounded-2xl border-2 p-6 bg-white">
      <div className="influencer-info flex flex-wrap text-center ">
        <div className="relative influencer-pic mr-6 ">
          <Image
            src={influencer.avatar.replace('-sign-va', '')}
            alt="Influencer"
            className=" size-24 rounded-full"
            width={60}
            height={60}
          />
          <FaCheckCircle className="check-icon absolute top-[75px] right-1 size-7 rounded-full border-2 bg-white text-sky-500" />
        </div>

        <div className="header mt-2">
          <div className="float-right text-4xl">
            {influencer.platform === "tiktok" && (
              <Image src='/tiktok1.png' width={50} height={50} alt='insta' />
            )}
            {influencer.platform === "youtube" && (
              <Image src='/youtube.png' width={50} height={50} alt='insta' />
            )}
            {influencer.platform === "Instagram" && (
              <Image src='/insta.png' width={50} height={50} alt='insta' />
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
      <div className="flex gap-10 mt-4 contact">
        {influencer.contact.email.length>0 && (
          <div className="flex email mt-4 gap-2">
            <MdOutlineMail className="email-icon mt-1 text-primary text-xl" />
            <div>
              {influencer.contact.email.map((email, index) => (
                <span className="font-extralight block text-neutral-400" key={index}>{email}</span>
              ))}
            </div>
          </div>
        )}
        {influencer.contact.phone.length>0  && (
           <div className="flex email mt-4 gap-2">
            <FiPhone className="email-icon mt-1 text-primary text-xl" />
            <div>
              {influencer.contact.phone.map((phone, index) => (
                <span className="font-extralight block text-neutral-400" key={index}>{phone}</span>
              ))}
            </div>
          </div>
        )}
        {influencer.contact.url.length>0  && (
          <div className="flex email mt-4 gap-2">
            <FaLink className="email-icon mt-1 text-primary text-xl"/>
            <div>
              {influencer.contact.url.map((url, index) => (
                <span className="font-extralight block text-neutral-400" key={index}>{url}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerCard;

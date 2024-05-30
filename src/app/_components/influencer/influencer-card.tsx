'use client'
import { FaCheckCircle, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import { InfluencerDto } from '@/service/dto/influencerDto';
import { FC } from 'react';


export interface InfluencerCardProps {
    influencer: InfluencerDto;
}

const InfluencerCard: FC<InfluencerCardProps> = ({influencer}) => {
 
  return (
    <div className="container border-2 w-fit m-auto mt-10 p-6 rounded-2xl">
      <div className='influencer-info flex flex-row text-center '>
        <div className="influencer-pic mr-6">
        <Image src={influencer.avatar} alt="Influencer" className="influencer-pic rounded-full size-24  " 
        width={60} height={60}/>
        <FaCheckCircle className="check-icon text-sky-500	 ml-[70px] mt-[-24px] bg-white	rounded-full  size-7 absolute border-2" />

      </div>

      <div className="header mt-2">
        <div className='float-right text-4xl'>
          {influencer.platform === 'TikTok' && <FaTiktok className="tiktok-icon" />}
          {influencer.platform === 'YouTube' && <FaYoutube className="youtube-icon" />}
          {influencer.platform === 'Instagram' && <FaInstagram className="instagram-icon" />}
        </div>
        <div className="profile flex flex-row">
          <div className="profile-info">
            <h2 className='text-blue '>@{influencer.name}</h2>
            <p className='text-neutral-600'>{influencer.username}</p>
          </div>
          
        </div>
        <div className="stats flex justify-between font-bold m-4 w-9/12">
          <div className='flex gap-1'>
            <h3>{influencer.stats.followerCount}</h3>
            <p className='text-neutral-400 font-extralight	'>Followers</p>
          </div>
          <div className='flex gap-1'>
            <h3>{influencer.stats.followingCount}</h3>
            <p className='text-neutral-400 font-extralight	'>Following</p>
          </div>
          <div className='flex gap-1'>
            <h3>{influencer.stats.postsCount}</h3>
            <p className='text-neutral-400 font-extralight	'>Posts</p>
          </div>
        </div>
        <div className='ml-4'>{influencer.bio}</div>
          
      </div>
      </div>
      
      <div className="categories flex gap-4 mt-10">
          {influencer.categories.map((category, index) => (
            <div key={index} className="category border-2 w-32 rounded-2xl text-center font-semibold">
              {category}
              <p className='text-neutral-400 font-extralight'>20%</p>
            </div>
          ))}
      </div>
  
    </div>
  );
};

export default InfluencerCard;

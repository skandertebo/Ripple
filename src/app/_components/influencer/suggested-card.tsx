import Image from "next/image"
import { InfluencerCardProps } from "./influencer-card"
import { FC } from "react"
import { FaCheckCircle, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"


const SuggestedCard: FC<InfluencerCardProps> = ({ influencer }) => {
    return (
        <div className="container border-2 w-72 m-auto mt-10 p-5 rounded-2xl text-center">
                <div className='float-left text-4xl'>
                {influencer.platform === 'TikTok' && <FaTiktok className="tiktok-icon" />}
                {influencer.platform === 'YouTube' && <FaYoutube className="youtube-icon" />}
                {influencer.platform === 'Instagram' && <FaInstagram className="instagram-icon" />}
                </div>
            <div className="influencer-pic">
            <Image src={influencer.avatar} alt="Influencer" className="influencer-pic rounded-full size-20 ml-20 " 
            width={50} height={50}/>
            <FaCheckCircle className="check-icon text-sky-500 ml-[140px] mt-[-24px] bg-white rounded-full  size-7 absolute border-2" />
    
    
            <div className="profile-info mt-3">
                <h2 className='text-blue '>@{influencer.name}</h2>
            </div>

            <div className="text-xs mt-3 text-neutral-600 ">
                {influencer.bio}
            </div>
            
            <div className="stats flex ml-4 gap-2 mt-3 text-sm  font-semibold w-9/12">
            <div>
                <h3>{influencer.stats.followerCount}</h3>
                <p className='text-neutral-400 font-extralight	text-xs'>Followers</p>
            </div>
            <div>
                <h3>{influencer.stats.followingCount}</h3>
                <p className='text-neutral-400 font-extralight	text-xs'>Following</p>
            </div>
            <div >
                <h3>{influencer.stats.postsCount}</h3>
                <p className='text-neutral-400 font-extralight text-xs	'>Posts</p>
            </div>
            </div>
            
        </div>
        </div>
    
    )
}

export default SuggestedCard
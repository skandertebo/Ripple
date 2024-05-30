export interface InfluencerDto {
    _id: string;
    name: string;
    username: string;
    bio: string;
    avatar: string;
    stats: {
        postsCount: string;
        followerCount: string;
        followingCount: string;
    };
    platform: string;
    contact: {
        email: string[];
        phone: string[];
        url: string[];
    };
    categories: string[];
}
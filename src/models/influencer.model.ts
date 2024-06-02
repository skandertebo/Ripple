import type { Model } from "mongoose";
import mongoose, { Schema, model } from "mongoose";

export interface IInfluencer {
  _id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  stats: {
    postsCount: number;
    followerCount: number;
    followingCount: number;
  };
  platform: string;
  contact: {
    email: string[];
    phone: string[];
    url: string[];
  };
  categories?: string[];
}

export const influencerSchema = new Schema<IInfluencer>(
  {
    _id: { type: String },
    name: { type: String },
    username: { type: String },
    bio: { type: String },
    avatar: { type: String },
    stats: {
      postsCount: { type: Number },
      followerCount: { type: Number },
      followingCount: { type: Number },
    },
    platform: { type: String },
    contact: {
      email: { type: [String] },
      phone: { type: [String] },
      url: { type: [String] },
    },
    categories: { type: [String] },
  },
  { collection: "influencer" },
);

export const InfluencerModel: Model<IInfluencer> =
  mongoose.models.influencer ??
  model<IInfluencer>("influencer", influencerSchema);

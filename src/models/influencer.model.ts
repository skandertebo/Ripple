import type { Model } from "mongoose";
import mongoose, { Schema, model } from "mongoose";

export interface IInfluencer {
  _id: mongoose.Types.ObjectId;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  stats: {
    postsCount: number | string;
    followerCount: number | string;
    followingCount: number | string;
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
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    username: { type: String },
    bio: { type: String },
    avatar: { type: String },
    stats: {
      postsCount: { type: mongoose.Schema.Types.Mixed },
      followerCount: { type: mongoose.Schema.Types.Mixed },
      followingCount: { type: mongoose.Schema.Types.Mixed },
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

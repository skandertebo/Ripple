import type { Model } from "mongoose";
import mongoose, { Schema, model } from "mongoose";

export interface ISearch {
  _id?: string;
  name: string;
  userId: string;
  sessionId: string;
  createdAt: Date;
  deletedAt?: Date;
  expired: boolean;
  messages: {
    type: "user" | "bot";
    content: string;
  }[];
  result: string[];
}

export const searchSchema = new Schema<ISearch>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    userId: { type: String },
    sessionId: { type: String },
    createdAt: { type: Date },
    deletedAt: { type: Date },
    expired: { type: Boolean },
    messages: {
      type: [
        {
          type: { type: String },
          content: { type: String },
        },
      ],
    },
    result: { type: [String] },
  },
  { collection: "search" },
);

export const SearchModel: Model<ISearch> =
  mongoose.models.search ?? model<ISearch>("search", searchSchema);

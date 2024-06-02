import type { Model } from "mongoose";
import mongoose, { Schema, model } from "mongoose";

export interface ISearch {
  _id?: string;
  name: string;
  userId: string;
  createdAt: Date;
  deletedAt?: Date;
  messages: {
    type: "user" | "bot";
    content: string;
  }[];
  result: string[];
}

export const searchSchema = new Schema<ISearch>(
  {
    name: { type: String },
    userId: { type: String },
    createdAt: { type: Date },
    deletedAt: { type: Date },
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

import type { SimilarInfluencer } from "@/app/influencers/[id]/page";
import { env } from "@/env";
import { InfluencerModel } from "@/models/influencer.model";
import axios from "axios";
import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const influencerRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
        search: z.string().optional(),
        platform: z.enum(["tiktok", "instagram", "youtube"]).optional(),
        minFollowers: z.number().optional(),
        category: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const query = InfluencerModel.find();
      if (input.search) {
        query.or([
          { name: { $regex: new RegExp(input.search, "i") } },
          { username: { $regex: new RegExp(input.search, "i") } },
          { bio: { $regex: new RegExp(input.search, "i") } },
        ]);
      }
      if (input.platform) {
        query.where({
          platform: { $regex: `^${input.platform}`, $options: "i" },
        });
      }
      if (input.minFollowers) {
        query.where({
          $or: [
            {
              $expr: {
                $gte: [
                  {
                    $toDouble: {
                      $cond: {
                        if: {
                          $eq: [{ $type: "$stats.followerCount" }, "string"],
                        },
                        then: {
                          $replaceAll: {
                            input: "$stats.followerCount",
                            find: ",",
                            replacement: "",
                          },
                        },
                        else: "$stats.followerCount",
                      },
                    },
                  },
                  input.minFollowers,
                ],
              },
            },
            {
              $and: [
                { "stats.followerCount": { $type: "int" } },
                { "stats.followerCount": { $gte: input.minFollowers } },
              ],
            },
          ],
        });
      }
      if (input.category) {
        query.where({ category: input.category });
      }
      const influencers = await query
        .limit(input.limit)
        .skip(input.offset)
        .lean();

      return influencers;
    }),

  getOne: protectedProcedure.input(z.string()).query(async ({ input }) => {
    const isValid = isValidObjectId(input);
    if (!isValid) {
      return null;
    }
    const influencer = await InfluencerModel.findById(input).lean();
    return influencer;
  }),

  getByIds: protectedProcedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
      const influencers = await InfluencerModel.find({
        _id: { $in: input },
      }).lean();
      return influencers;
    }),

  findByUsername: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const influencer = await InfluencerModel.findOne({
        username: input,
      }).lean();
      return influencer;
    }),
  getSimilarInfluencers: protectedProcedure
    .input(z.string())
    .query(async ({ input: id }) => {
      try {
        // Construct the URL with the influencer ID
        const url = `${env.INFLUENCER_API_URL}/search/similar/${id}`;
        const response = await axios.get<Array<SimilarInfluencer>>(url);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching similar influencers:", error);
        return [];
      }
    }),
  getCategories: protectedProcedure.query(async () => {
    const categories = await InfluencerModel.distinct("category").lean();
    return categories as string[];
  }),
});

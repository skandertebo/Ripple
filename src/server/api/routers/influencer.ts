import { InfluencerModel } from "@/models/influencer.model";
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
      console.log(input);
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
      const influencers = await query.limit(input.limit).skip(input.offset);

      return influencers;
    }),

  getOne: protectedProcedure.input(z.string()).query(async ({ input }) => {
    const influencer = await InfluencerModel.findById(input);

    return influencer;
  }),
});

import { InfluencerModel } from "@/models/influencer.model";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const influencerRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
      }),
    )
    .query(async ({ input }) => {
      const influencers = await InfluencerModel.find()
        .limit(input.limit)
        .skip(input.offset);

      return influencers;
    }),

  getOne: protectedProcedure.input(z.string()).query(async ({ input }) => {
    const influencer = await InfluencerModel.findById(input);

    return influencer;
  }),
});

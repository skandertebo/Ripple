import { SearchModel } from "@/models/search.model";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const searchRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return SearchModel.find({ userId: input.userId });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return SearchModel.create({
        name: input.name,
        userId: input.userId,
        createdAt: new Date(),
        messages: [],
        result: [],
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        searchId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return SearchModel.findByIdAndDelete(input.searchId);
    }),
  addMessage: protectedProcedure
    .input(
      z.object({
        searchId: z.string(),
        type: z.enum(["user", "bot"]),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return SearchModel.findByIdAndUpdate(
        input.searchId,
        {
          $push: {
            messages: {
              type: input.type,
              content: input.content,
            },
          },
        },
        { new: true },
      );
    }),
  addResult: protectedProcedure
    .input(
      z.object({
        searchId: z.string(),
        result: z.array(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      return SearchModel.findByIdAndUpdate(
        input.searchId,
        {
          $push: {
            result: { $each: input.result },
          },
        },
        { new: true },
      );
    }),
  updateName: protectedProcedure
    .input(
      z.object({
        searchId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return SearchModel.findByIdAndUpdate(
        input.searchId,
        { name: input.name },
        { new: true },
      );
    }),
});

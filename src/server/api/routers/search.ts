import { SearchModel } from "@/models/search.model";
import axios from "axios";
import mongoose from "mongoose";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const searchRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure.query(async ({ ctx }) => {
    return SearchModel.find({ userId: ctx.session.user.id }).lean();
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        sessionId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const newSearch = await SearchModel.create({
        _id: new mongoose.Types.ObjectId(),
        name: input.name,
        userId: ctx.session.user.id,
        sessionId: input.sessionId,
        createdAt: new Date(),
        expired: false,
        messages: [],
        result: [],
      });
      const search = await SearchModel.findById(newSearch._id).lean();
      return search;
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
  getSession: protectedProcedure
    .input(
      z.object({
        maxResults: z.number(),
        threshold: z.number(),
        minRequests: z.number(),
        maxRequests: z.number(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const url = `${process.env.INFLUENCER_API_URL}/search/interactive/get_session`;
        const response = await axios.post<string>(url, input);
        return response.data;
      } catch (err) {
        throw new Error("failed to fetch");
      }
    }),
  search: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        query: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        console.log("Sending req to micro 2", input.sessionId, input.query);
        const url = `${process.env.INFLUENCER_API_URL}/search/interactive/search`;
        const params = { session_key: input.sessionId };
        const response = await axios.post(
          url,
          { input: input.query },
          { params: params },
        );
        console.log("Response from micro", response.data);
        return response.data;
      } catch (err) {
        throw new Error("failed to fetch");
      }
    }),
});

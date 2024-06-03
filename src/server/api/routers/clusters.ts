import { env } from "@/env";
import axios from "axios";
import { adminProcedure, createTRPCRouter } from "../trpc";

export interface Cluster {
  Name: string;
  Keywords: string[];
  Count: number;
}

export const clusterRouter = createTRPCRouter({
  getAll: adminProcedure.query(async () => {
    const url = `${env.INFLUENCER_API_URL}/clusters`;
    const res = await axios.get<Cluster[]>(url);
    return res.data;
  }),
});

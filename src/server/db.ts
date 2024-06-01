import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

let mongooseConnection: mongoose.Connection;

export const connectDB = async () => {
  if (mongooseConnection) return mongooseConnection;
  console.log("Connecting to MongoDB");
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {});
    mongooseConnection = conn.connection;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

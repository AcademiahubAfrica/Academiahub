/* This file is used to create a singleton instance of PrismaClient. It must always be added to a Next.js project
   to prevent multiple instances of PrismaClient from being created during hot reloading in development mode.
*/
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@/lib/generated/prisma";

// Load DATABASE_URL from the monorepo root .env (Prisma schema references it there)
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
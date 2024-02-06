/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
    var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    // ensures the Prisma client is reused during hot-reloading
    // this will prevent too many instances of Prisma Client in development
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;

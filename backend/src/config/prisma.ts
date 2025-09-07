import { PrismaClient } from "@prisma/client";

const development = process.env.NODE_ENV == "development";

const prisma = new PrismaClient({
  log: development ? ["query", "info", "warn", "error"] : ["error"],
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export { prisma };

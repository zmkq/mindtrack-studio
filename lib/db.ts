import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  mindtrackPrisma?: PrismaClient
}

export function getDb() {
  if (!globalForPrisma.mindtrackPrisma) {
    globalForPrisma.mindtrackPrisma = new PrismaClient()
  }

  return globalForPrisma.mindtrackPrisma
}

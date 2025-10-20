import { PrismaClient } from "@prisma/client"
import { databaseUrl } from "../settings"

/**
 * Prisma Clientのシングルトンインスタンス
 *
 * Activityから利用する際は、このインスタンスをimportして使用する
 */
const createPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  })
}

// グローバル変数を使用してホットリロード時の重複接続を防ぐ
const globalForPrisma = global as typeof global & {
  prisma?: PrismaClient
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env["NODE_ENV"] !== "production") {
  globalForPrisma.prisma = prisma
}

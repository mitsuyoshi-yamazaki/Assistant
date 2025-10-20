import { PrismaClient } from "@prisma/client"
import { databaseUrl, environment } from "../env"

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

if (environment !== "production") {
  globalForPrisma.prisma = prisma
}

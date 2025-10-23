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
type GlobalWithPrisma = typeof global & {
  prisma?: PrismaClient
}

const globalForPrisma = global as GlobalWithPrisma

export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient()

if (environment !== "production") {
  globalForPrisma.prisma = prisma
}

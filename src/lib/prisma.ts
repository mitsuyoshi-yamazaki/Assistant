import { PrismaClient } from "@prisma/client"
import { databaseUrl, environment } from "../env"

/**
 * Prisma Clientのシングルトンインスタンス
 *
 * Activityから利用する際は、このインスタンスをimportして使用する
 */
const createPrismaClient = (): PrismaClient => {
  // PrismaClientのコンストラクタは型定義上anyを含むため、eslint-disableが必要
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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

// グローバル変数からの取得はanyを含むため、eslint-disableが必要
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient()

if (environment !== "production") {
  // グローバル変数への代入はanyを含むため、eslint-disableが必要
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  globalForPrisma.prisma = prisma
}

import { prisma } from "../lib/prisma"

type SaveReadItLaterItemParams = {
  readonly url: string
  readonly description: string | null
  readonly category: string
  readonly tags: readonly string[]
}

/**
 * Read It Later項目をデータベースに保存する
 */
export const saveReadItLaterItem = async (params: SaveReadItLaterItemParams): Promise<string> => {
  const result = await prisma.readItLaterItem.create({
    data: {
      url: params.url,
      description: params.description,
      category: params.category,
      tags: [...params.tags],
    },
  })
  return result.id
}

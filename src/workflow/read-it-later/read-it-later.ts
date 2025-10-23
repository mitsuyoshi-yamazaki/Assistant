import { proxyActivities } from "@temporalio/workflow"
import type * as activities from "../../activity/activities"

const { saveReadItLaterItem } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
})

export type AddReadItLaterParams = {
  readonly url: string
  readonly description?: string
  readonly tags?: readonly string[]
}

/**
 * URLからカテゴリを判定する
 * - youtube.com または youtu.be を含む場合は "youtube"
 * - それ以外は "other"
 */
const categorizeUrl = (url: string): string => {
  const lowerUrl = url.toLowerCase()
  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
    return "youtube"
  }
  return "other"
}

/**
 * Read It Later項目を追加するWorkflow
 * URLを受け取り、カテゴリを判定してデータベースに保存する
 */
export const addReadItLater = async (params: AddReadItLaterParams): Promise<string> => {
  // URLからカテゴリを判定
  const category = categorizeUrl(params.url)

  // データベースに保存
  const itemId = await saveReadItLaterItem({
    url: params.url,
    description: params.description ?? null,
    category,
    tags: params.tags ?? [],
  })

  return itemId
}

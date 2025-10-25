import { Workflow } from "@temporalio/workflow"

/**
 * 時刻トリガーによって定期実行されるデモWorkflow
 * 現在時刻を含むメッセージをログ出力する
 */
export const scheduledWorkflow: Workflow = (): Promise<void> => {
  const currentTime = new Date().toISOString()
  console.log(`Scheduled workflow executed at: ${currentTime}`)
  return Promise.resolve()
}

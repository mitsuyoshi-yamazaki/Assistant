import { proxyActivities } from "@temporalio/workflow"
import type * as activities from "../activity/activities"

const { findSampleWorkflowByArgument, startSampleWorkflow } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
})

/**
 * 指定された引数値とその3倍の値について、sampleWorkflowの実行状況を確認し、
 * 存在すればそのWorkflow IDを、存在しなければ新規実行してそのIDをログ出力する
 *
 * @param argument 引数値
 */
export const findOrStartSampleWorkflow = async (argument: number): Promise<void> => {
  const values = [argument, argument * 3]

  for (const value of values) {
    const existingWorkflowId = await findSampleWorkflowByArgument(value)

    if (existingWorkflowId != null) {
      console.log(`found existing workflow: ${existingWorkflowId}`)
    } else {
      const newWorkflowId = await startSampleWorkflow(value)
      console.log(`no existing workflow, created: ${newWorkflowId}`)
    }
  }
}

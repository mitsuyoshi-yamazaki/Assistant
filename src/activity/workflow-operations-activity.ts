import { Connection, ConnectionOptions, WorkflowClient } from "@temporalio/client"
import { namespace, taskQueueNames, temporalServerAddress } from "../env"

/**
 * 指定された引数値を持つsampleWorkflowを検索する
 * @param argument 検索対象の引数値
 * @returns 見つかったWorkflow IDまたはnull
 */
export const findSampleWorkflowByArgument = async (argument: number): Promise<string | null> => {
  const connectionOptions: ConnectionOptions = {}
  if (temporalServerAddress != null) {
    connectionOptions.address = temporalServerAddress
  }
  const connection = await Connection.connect(connectionOptions)
  const client = new WorkflowClient({ connection, namespace })

  const list = client.list({
    query: `WorkflowType = "sampleWorkflow" AND SampleWorkflowArgument = ${argument}`,
  })

  for await (const workflow of list) {
    if (workflow.status.name !== "TERMINATED" && workflow.status.name !== "FAILED") {
      return workflow.workflowId
    }
  }

  return null
}

/**
 * 指定された引数値でsampleWorkflowを新規実行する
 * @param argument 実行時の引数値
 * @returns 新規実行されたWorkflow ID
 */
export const startSampleWorkflow = async (argument: number): Promise<string> => {
  const connectionOptions: ConnectionOptions = {}
  if (temporalServerAddress != null) {
    connectionOptions.address = temporalServerAddress
  }
  const connection = await Connection.connect(connectionOptions)
  const client = new WorkflowClient({ connection, namespace })

  const handle = await client.start("sampleWorkflow", {
    args: [argument],
    taskQueue: taskQueueNames.default,
    workflowId: `sampleWorkflow-${argument}-${Date.now()}`,
  })

  return handle.workflowId
}

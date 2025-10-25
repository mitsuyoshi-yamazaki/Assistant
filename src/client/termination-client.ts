import { Connection, ConnectionOptions, WorkflowClient } from "@temporalio/client"
import { namespace, temporalServerAddress } from "../env"

const run = async (): Promise<void> => {
  // コマンドライン引数の取得
  const args = process.argv.slice(2)
  if (args.length !== 1) {
    console.error("Usage: yarn ts-node src/client/termination-client.ts <workflowId>")
    console.error(
      "Example: yarn ts-node src/client/termination-client.ts scheduledWorkflow-cron-1234567890"
    )
    process.exit(1)
  }

  const workflowId = args[0]

  if (workflowId == null) {
    console.error("Error: workflowId is required")
    process.exit(1)
  }

  // Temporal Serverへの接続
  const connectionOptions: ConnectionOptions = {}
  if (temporalServerAddress != null) {
    connectionOptions.address = temporalServerAddress
  }
  const connection = await Connection.connect(connectionOptions)
  const client = new WorkflowClient({ connection, namespace })

  // Workflowハンドルを取得
  console.log(`Terminating workflow: ${workflowId}`)
  const handle = client.getHandle(workflowId)

  try {
    // Workflowを停止
    await handle.terminate()
    console.log(`Workflow ${workflowId} has been terminated successfully`)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to terminate workflow: ${error.message}`)
    } else {
      console.error("Failed to terminate workflow")
    }
    process.exit(1)
  }
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})

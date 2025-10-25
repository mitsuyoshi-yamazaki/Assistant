import { Connection, ConnectionOptions, WorkflowClient } from "@temporalio/client"
import { namespace, taskQueueNames, temporalServerAddress } from "../env"
import { isWorkflowName, WorkflowName } from "./workflow-name"

const run = async (): Promise<void> => {
  // コマンドライン引数の取得
  const args = process.argv.slice(2)
  if (args.length !== 2) {
    console.error("Usage: yarn client:scheduled <workflowName> <cronSchedule>")
    console.error('Example: yarn client:scheduled scheduledWorkflow "*/1 * * * *"')
    process.exit(1)
  }

  const workflowNameArg = args[0]
  const cronSchedule = args[1]

  if (workflowNameArg == null || cronSchedule == null) {
    console.error("Error: Both workflowName and cronSchedule are required")
    process.exit(1)
  }

  // Workflow名の検証
  if (!isWorkflowName(workflowNameArg)) {
    console.error(`Error: Unknown workflow name "${workflowNameArg}"`)
    console.error("Available workflows can be found in src/workflow/workflows.ts")
    process.exit(1)
  }

  const workflowName: WorkflowName = workflowNameArg

  // Temporal Serverへの接続
  const connectionOptions: ConnectionOptions = {}
  if (temporalServerAddress != null) {
    connectionOptions.address = temporalServerAddress
  }
  const connection = await Connection.connect(connectionOptions)
  const client = new WorkflowClient({ connection, namespace })

  // Workflowの起動
  const workflowId = `${workflowName}-cron-${Date.now()}`
  console.log(`Starting workflow "${workflowName}" with cron schedule: ${cronSchedule}`)

  const handle = await client.start(workflowName, {
    taskQueue: taskQueueNames.default,
    workflowId,
    cronSchedule,
  })

  console.log(`Started Workflow ${handle.workflowId} with RunID ${handle.firstExecutionRunId}`)
  console.log("Workflow will execute according to the cron schedule.")
  console.log("Note: The workflow will continue running until cancelled.")
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})

import { Connection, WorkflowClient } from "@temporalio/client"
import { namespace, taskQueueNames } from "../settings"
import { sampleWorkflow } from "../workflow/sample-workflow"

async function run() {
  const connection = await Connection.connect()
  const client = new WorkflowClient({ connection, namespace })

  console.log(`Starting sample workflow`)

  const handle = await client.start(sampleWorkflow, {
    args: [3],
    taskQueue: taskQueueNames.default,
    workflowId: `${Date.now()}`,
  })

  console.log(`Started Workflow ${handle.workflowId} with RunID ${handle.firstExecutionRunId}`)
  console.log(await handle.result())
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})

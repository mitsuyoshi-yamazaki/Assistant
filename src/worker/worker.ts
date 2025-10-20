import { Worker } from "@temporalio/worker"
import * as activities from "../activity/activities"
import { namespace, taskQueueNames } from "../env"

async function run() {
  // Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    workflowsPath: require.resolve("../workflow/workflows"),
    activities,
    namespace,
    taskQueue: taskQueueNames.default,
  })

  // Start accepting tasks from the Task Queue.
  await worker.run()
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})

import { NativeConnection, NativeConnectionOptions, Worker } from "@temporalio/worker"
import * as activities from "../activity/activities"
import { namespace, taskQueueNames, temporalServerAddress } from "../env"

async function run() {
  // Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const connectionOptions: NativeConnectionOptions = {}
  if (temporalServerAddress != null) {
    connectionOptions.address = temporalServerAddress
  }
  const worker = await Worker.create({
    workflowsPath: require.resolve("../workflow/workflows"),
    activities,
    namespace,
    taskQueue: taskQueueNames.default,
    connection: await NativeConnection.connect(connectionOptions),
  })

  // Start accepting tasks from the Task Queue.
  await worker.run()
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})

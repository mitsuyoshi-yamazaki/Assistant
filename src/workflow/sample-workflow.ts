import { Workflow } from "@temporalio/workflow"
import { sampleActivity } from "../activity/sample-activity"

export const sampleWorkflow: Workflow = async (argument: number): Promise<string> => {
  return new Promise(resolve => {
    resolve(sampleActivity(argument))
  })
}

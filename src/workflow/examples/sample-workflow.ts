import { Workflow, upsertSearchAttributes } from "@temporalio/workflow"
import { sampleActivity } from "../../activity/sample-activity"

export const sampleWorkflow: Workflow = async (argument: number): Promise<string> => {
  upsertSearchAttributes({
    SampleWorkflowArgument: [argument],
  })

  return new Promise(resolve => {
    resolve(sampleActivity(argument))
  })
}

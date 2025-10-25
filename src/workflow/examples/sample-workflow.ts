import { Workflow, upsertSearchAttributes, proxyActivities } from "@temporalio/workflow"
import type * as activities from "../../activity/activities"

const { sampleActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
})

export const sampleWorkflow: Workflow = async (argument: number): Promise<string> => {
  upsertSearchAttributes({
    SampleWorkflowArgument: [argument],
  })

  // const sampleActivity: symbol と解釈されるため、型アサーションを使用
  const result = await (sampleActivity as unknown as (value: number) => Promise<string>)(argument)
  return result
}

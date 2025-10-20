import { Workflow } from "@temporalio/workflow"

export const sampleWorkflow: Workflow = async (): Promise<string> => {
  return new Promise(resolve => {
    resolve("not implemented yet")
  })
}

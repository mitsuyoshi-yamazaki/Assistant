import * as Workflows from "../workflow/workflows"

export type WorkflowName = keyof typeof Workflows

export const isWorkflowName = (name: string): name is WorkflowName => {
  if ((Workflows as Record<string, unknown>)[name] == null) {
    return false
  }
  return true
}

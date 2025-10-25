import { proxyActivities } from "@temporalio/workflow"
import * as activities from "../../../activity/activities"

const { shellScriptActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
})

/**
 * シェルスクリプト（pwd コマンド）を実行するデモWorkflow
 * Workerが実行されている環境の現在の作業ディレクトリパスを取得する
 *
 * @returns 現在の作業ディレクトリの絶対パス
 */
export const shellScriptWorkflow = async (): Promise<string> => {
  const result: string = await (shellScriptActivity as unknown as () => Promise<string>)() // このasは不要のはずだが、 const shellScriptActivity: symbol と解釈されるため
  console.log(`Workflow completed. Current working directory: ${result}`)
  return result
}

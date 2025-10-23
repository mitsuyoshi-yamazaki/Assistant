import { Connection, ConnectionOptions, WorkflowClient } from "@temporalio/client"
import { namespace, taskQueueNames, temporalServerAddress } from "../env"
import { isWorkflowName } from "./workflow-name"

/**
 * コマンドライン引数を解析してWorkflow引数配列を返す
 * - JSON配列形式の文字列の場合はパースして返す
 * - それ以外の場合は各引数を個別に型変換して配列として返す
 */
const parseArguments = (args: string[]): unknown[] => {
  if (args.length === 0 || args[0] == null) {
    return []
  }

  // 最初の引数がJSON配列かどうか試行
  if (args.length === 1) {
    try {
      const parsed: unknown = JSON.parse(args[0])
      if (typeof parsed !== "number" && typeof parsed !== "string") {
        if (!Array.isArray(parsed)) {
          throw new Error("JSON形式の引数はルートレベルが配列である必要があります")
        }
        return parsed
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        // JSON解析失敗 → 位置引数として処理
      } else {
        // 配列でない場合のエラーは再スロー
        throw error
      }
    }
  }

  // 位置引数として各値を型変換
  return args.map(value => {
    const num = Number(value)
    if (!Number.isNaN(num) && String(num) === value) {
      return num
    } else {
      return value
    }
  })
}

async function run() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error("使用方法: yarn client <workflow名> [引数...]")
    process.exit(1)
  }

  const workflowName = args[0]
  const workflowArgs = parseArguments(args.slice(1))

  // Workflow名の検証
  if (workflowName == null || !isWorkflowName(workflowName)) {
    console.error(`エラー: '${workflowName}' は有効なWorkflow名ではありません`)
    process.exit(1)
  }

  const connectionOptions: ConnectionOptions = {}
  if (temporalServerAddress != null) {
    connectionOptions.address = temporalServerAddress
  }
  const connection = await Connection.connect(connectionOptions)
  const client = new WorkflowClient({ connection, namespace })

  console.log(`Starting workflow: ${workflowName}`)
  console.log(`Arguments:`, workflowArgs)

  const handle = await client.start(workflowName, {
    args: workflowArgs,
    taskQueue: taskQueueNames.default,
    workflowId: `${workflowName}-${Date.now()}`,
  })

  console.log(`Started Workflow ${handle.workflowId} with RunID ${handle.firstExecutionRunId}`)
  console.log(await handle.result())
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})

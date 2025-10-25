import { execSync } from "child_process"

/**
 * シェルスクリプトを実行するActivity
 * pwd コマンドを実行し、現在の作業ディレクトリパスを返す
 *
 * @returns 現在の作業ディレクトリの絶対パス
 * @throws 子プロセスの実行に失敗した場合にエラーを送出
 */
export const shellScriptActivity = (): string => {
  try {
    const result = execSync("pwd", { encoding: "utf-8" })
    const output = result.trim()
    console.log(`Shell script executed: pwd`)
    console.log(`Output: ${output}`)
    return output
  } catch (error) {
    console.error(`Failed to execute shell script: ${String(error)}`)
    throw error
  }
}

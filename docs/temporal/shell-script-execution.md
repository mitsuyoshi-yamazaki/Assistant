# シェルスクリプト実行に関する注意点

## 概要

Temporal WorkflowからActivityを通じてシェルスクリプトを実行する際の注意点と推奨事項をまとめます。

## 実装上の懸念点

### 1. セキュリティリスク

#### コマンドインジェクション

- **リスク**: 外部入力をそのままシェルコマンドに渡すと、コマンドインジェクション攻撃のリスクがある
- **対策**:
  - 可能な限り、実行するコマンドをハードコーディングする
  - 外部入力を使用する場合は、厳格なバリデーションと入力値のサニタイズを行う
  - `execSync`や`exec`の代わりに、`spawn`や`execFile`を使用し、コマンドと引数を分離する

#### 権限管理

- **リスク**: Workerプロセスが持つ権限で任意のコマンドが実行される
- **対策**:
  - Workerプロセスは必要最小限の権限で実行する
  - 機密性の高い操作は、別の認証・認可メカニズムを経由する

### 2. べき等性（Idempotency）

- **課題**: Activityは再試行される可能性があるため、べき等性が重要
- **推奨事項**:
  - 同じコマンドを複数回実行しても安全な操作のみを行う
  - または、実行前に状態を確認し、既に実行済みの場合はスキップする仕組みを実装
  - 例: `pwd`コマンドは状態を変更しないため、べき等性の問題はない

### 3. エラーハンドリング

#### コマンド実行失敗

- **考慮点**:
  - コマンドが失敗した場合（終了コード非0）、`execSync`は例外を送出する
  - Activity内でキャッチして適切に処理するか、Workflowに伝播させる

#### タイムアウト

- **推奨事項**:
  - `proxyActivities`の`startToCloseTimeout`を適切に設定する
  - 長時間実行されるコマンドの場合は、`execSync`の`timeout`オプションも設定する
  - 例: `execSync("command", { timeout: 30000 })` // 30秒

### 4. リソース管理

#### プロセス管理

- **考慮点**:
  - 子プロセスが適切に終了することを確認する
  - ゾンビプロセスやメモリリークを防ぐ

#### 並列実行

- **考慮点**:
  - 複数のActivityが同時にシェルスクリプトを実行する可能性がある
  - システムリソースの競合やレート制限を考慮する

### 5. 決定性（Determinism）

- **重要**: Workflowコードは決定的である必要があるが、Activityは非決定的でも問題ない
- **実装**: シェルスクリプトの実行はActivity内で行うため、決定性の問題は発生しない
- **注意**: Workflow内で直接`execSync`などを呼び出してはならない

### 6. ログとモニタリング

#### 標準出力/標準エラー出力

- **推奨事項**:
  - コマンドの標準出力と標準エラー出力をログに記録する
  - デバッグやトラブルシューティングに有用

#### 実行時間の監視

- **推奨事項**:
  - コマンドの実行時間を測定し、異常に長い実行時間を検出できるようにする

## 実装例

### 安全なコマンド実行（引数あり）

```typescript
import { execFile } from "child_process"
import { promisify } from "util"

const execFilePromise = promisify(execFile)

export const safeExecuteCommand = async (arg: string): Promise<string> => {
  // バリデーション
  if (!/^[a-zA-Z0-9_-]+$/.test(arg)) {
    throw new Error("Invalid argument format")
  }

  try {
    // execFileを使用してコマンドと引数を分離
    const { stdout } = await execFilePromise("echo", [arg])
    return stdout.trim()
  } catch (error) {
    console.error(`Command execution failed: ${error}`)
    throw error
  }
}
```

### タイムアウト付き実行

```typescript
export const executeWithTimeout = (): string => {
  try {
    const result = execSync("long-running-command", {
      encoding: "utf-8",
      timeout: 30000, // 30秒でタイムアウト
    })
    return result.trim()
  } catch (error) {
    if (error.killed && error.signal === "SIGTERM") {
      throw new Error("Command execution timed out")
    }
    throw error
  }
}
```

## まとめ

シェルスクリプト実行をTemporal Workflowに組み込む際は、以下の点に特に注意してください：

1. **セキュリティ**: コマンドインジェクションを防ぐため、入力値の検証を徹底する
2. **べき等性**: 再試行に備えて、べき等な操作を心がける
3. **タイムアウト**: 適切なタイムアウト設定で、ハングアップを防ぐ
4. **Activity内で実行**: Workflow内で直接実行せず、必ずActivity内で実行する
5. **エラーハンドリング**: 失敗時の適切な処理を実装する

これらの点に注意することで、安全で信頼性の高いシェルスクリプト実行を実現できます。

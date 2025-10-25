# Shell Script Workflow

## 要件

Worker環境でシェルスクリプトを実行するWorkflowの実装パターンを検証する。

## Workflow仕様

### shellScriptWorkflow

Workerが実行されている環境でシェルスクリプト（`pwd`コマンド）を実行し、現在の作業ディレクトリを取得するデモWorkflow。

#### 入力パラメータ

なし（引数なし）

#### 処理フロー

1. `shellScriptActivity` Activityを呼び出し、`pwd`コマンドを実行
2. コマンドの実行結果（現在の作業ディレクトリパス）をログ出力
3. 結果を返す

#### 返り値

- `Promise<string>`: `pwd`コマンドの実行結果（現在の作業ディレクトリの絶対パス）

## 実行方法

### 汎用クライアントを使用

引数なしWorkflowを起動する汎用クライアント `single-workflow-client` を使用します。

```bash
yarn client shellScriptWorkflow
```

#### 実行例

```bash
# shellScriptWorkflowを実行
yarn client shellScriptWorkflow

# 期待される出力例:
# Shell script executed: pwd
# Output: /Users/username/path/to/TemporalWorkflows
```

## 注意事項

- このWorkflowはWorkerが実行されている環境でシェルスクリプトを実行します
- セキュリティ上の理由から、実行するコマンドは慎重に選択してください
- 本デモでは`pwd`コマンドを実行していますが、実際のユースケースでは適切なエラーハンドリングとタイムアウト設定が必要です
- シェルスクリプト実行に関する詳細な注意点は [docs/temporal/shell-script-execution.md](../../../docs/temporal/shell-script-execution.md) を参照してください

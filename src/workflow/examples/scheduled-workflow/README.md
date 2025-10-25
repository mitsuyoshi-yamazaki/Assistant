# Scheduled Workflow

## 要件

時刻によって定期実行されるWorkflowの実装パターンを検証する。

## Workflow仕様

### scheduledWorkflow

定期的に実行され、現在時刻を含むメッセージをログ出力するデモWorkflow。

#### 入力パラメータ

なし（引数なし）

#### 処理フロー

1. 現在時刻（ISO 8601形式）を取得
2. 現在時刻を含むメッセージを`console.log()`で出力

#### 返り値

- なし（`Promise<void>`）

## 実行方法

### 汎用スケジュール実行クライアントを使用

引数なしWorkflowをcronスケジュールで起動する汎用クライアントを使用します。

```bash
yarn client:scheduled <workflowName> <cronSchedule>
```

#### 実行例

```bash
# scheduledWorkflowを毎分実行
yarn client:scheduled scheduledWorkflow "*/1 * * * *"

# scheduledWorkflowを毎時0分に実行
yarn client:scheduled scheduledWorkflow "0 * * * *"

# scheduledWorkflowを毎日午前9時に実行
yarn client:scheduled scheduledWorkflow "0 9 * * *"
```

### cronSchedule形式

cronScheduleは標準的な5フィールド形式を使用します：

```
分 時 日 月 曜日
```

- **分**: 0-59
- **時**: 0-23
- **日**: 1-31
- **月**: 1-12
- **曜日**: 0-6（0=日曜日）

詳細は[crontab.guru](https://crontab.guru/)で確認できます。

## 注意事項

- Workflowは取り消されるまで継続して実行されます
- スケジュールはUTC時間に基づいて計算されます
- 次のスケジュール実行予定時刻にWorkflowが実行中の場合、そのスケジュールはスキップされます
- cronScheduleによるスケジュール実行の詳細は[docs/temporal/scheduled-workflows.md](../../../docs/temporal/scheduled-workflows.md)を参照してください

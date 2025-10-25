# Workflowのスケジュール実行

このドキュメントでは、Temporal Workflowをcronスケジュールで定期実行する方法について説明します。

## 概要

Temporalでは、`cronSchedule`オプションを使用してWorkflowを定期的に実行できます。cronScheduleを指定すると、WorkflowはUTC時間に基づいてcronスケジュールに従って実行されます。

## cronScheduleの使用方法

### 基本的な使い方

WorkflowClientの`start()`メソッドに`cronSchedule`オプションを追加します：

```typescript
const handle = await client.start(workflowName, {
  taskQueue: taskQueueNames.default,
  workflowId: `${workflowName}-cron-${Date.now()}`,
  cronSchedule: "*/1 * * * *", // 毎分実行
})
```

### cronSchedule形式

cronScheduleは標準的な5フィールド形式を使用します：

```
分 時 日 月 曜日
```

各フィールドの範囲：

- **分**: 0-59
- **時**: 0-23
- **日**: 1-31
- **月**: 1-12
- **曜日**: 0-6（0=日曜日）

### 実行例

```typescript
// 毎分実行
cronSchedule: "*/1 * * * *"

// 毎時0分に実行
cronSchedule: "0 * * * *"

// 毎日午前9時に実行
cronSchedule: "0 9 * * *"

// 毎週月曜日の午前9時に実行
cronSchedule: "0 9 * * 1"

// 毎月1日の午前0時に実行
cronSchedule: "0 0 1 * *"
```

cron式の検証には[crontab.guru](https://crontab.guru/)が便利です。

## 実行動作の特性

### タイムゾーン

- スケジュール計算は**UTC時間**に基づいています
- ローカルタイムゾーンを考慮する場合は、UTC時間に変換してcronScheduleを設定する必要があります

### 実行順序

- 現在の実行が**完了/失敗/タイムアウト**した後にのみ、次の実行がスケジュールされます
- 順次実行が保証されます

### スキップ処理

- 次のスケジュール実行予定時刻にWorkflowが実行中の場合、そのスケジュールは**スキップ**されます
- 実行時間が長いWorkflowの場合、一部のスケジュールが実行されない可能性があります

### 継続実行

- Workflowは**終了または取り消されるまで自動停止しません**
- 停止するには、Temporal Web UIまたはAPIから明示的にWorkflowをキャンセルする必要があります

### リトライポリシーとの連携

- RetryPolicyが指定されている場合、失敗時に再試行ポリシーに従って動作します
- cronScheduleとRetryPolicyを組み合わせることで、堅牢なスケジュール実行が可能です

## 汎用スケジュール実行クライアント

本プロジェクトでは、引数なしWorkflowをcronスケジュールで起動する汎用クライアントを提供しています。

### 使用方法

```bash
yarn client:scheduled <workflowName> <cronSchedule>
```

### 実行例

```bash
# scheduledWorkflowを毎分実行
yarn client:scheduled scheduledWorkflow "*/1 * * * *"
```

### 実装

汎用クライアントの実装は[src/client/scheduled-workflow-client.ts](../../src/client/scheduled-workflow-client.ts)を参照してください。

## Schedules APIとの比較

Temporalでは、cronScheduleの他に**Schedules API**という新しい機能も提供しています。

### cronScheduleの特徴

- WorkflowOptionsで直接指定
- シンプルな実装
- 既存のWorkflow起動コードに容易に追加可能

### Schedules APIの特徴

- より高度な機能を提供
  - スケジュールの一時停止/再開
  - 実行中のスケジュールの更新
  - バックフィル機能（過去の実行をさかのぼって実行）
- より柔軟なスケジュール設定が可能

### 推奨事項

Temporal公式ドキュメントでは、新規実装においては**Schedules API**の使用を推奨しています：

> "We recommend using Schedules instead of Cron Jobs"

詳細は[Temporal公式ドキュメント](https://docs.temporal.io/develop/typescript/schedules)を参照してください。

## 参考リンク

- [Temporal Schedules - TypeScript SDK](https://docs.temporal.io/develop/typescript/schedules)
- [WorkflowOptions - TypeScript SDK API Reference](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions)
- [Crontab Guru - Cron式の検証ツール](https://crontab.guru/)

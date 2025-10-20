## 概要およびプロジェクト要件

- @README.md を参照せよ

## 実装

- @docs/coding-guidelines.md のコーディング規約に従え

### ディレクトリ構成

- `src/activity/`: Activity実装を格納。`activities.ts`で全実装をエクスポート
- `src/workflow/`: Workflow実装を格納。`workflows.ts`で全実装をエクスポート
  - 機能ごとにサブディレクトリを作成し、実装と要件（README.md）を格納
- `src/worker/`: Worker実装を格納。`activities.ts`と`workflows.ts`をimportしてTemporal Serverに登録
- `src/client/`: Client実装を格納。Workflowを起動するCLIアプリケーション
- `src/settings.ts`: 環境、namespace、taskQueue名などの共通設定

## 本プロジェクトに関連するタスク

- [GitHub](https://github.com/mitsuyoshi-yamazaki/Assistant) のissue及びPull Requestにより管理する

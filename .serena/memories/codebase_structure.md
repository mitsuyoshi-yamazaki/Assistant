# コードベース構造

## ディレクトリ構成

```
src/
├── activity/          # Activity実装を格納
│   ├── activities.ts  # 全Activity実装をエクスポート
│   └── sample-activity.ts
├── workflow/          # Workflow実装を格納
│   ├── workflows.ts   # 全Workflow実装をエクスポート
│   ├── sample-workflow.ts
│   └── read-it-later/ # 機能ごとのサブディレクトリ
│       ├── README.md  # 要件定義
│       └── read-it-later.ts
├── worker/            # Worker実装を格納
│   └── worker.ts      # activities.tsとworkflows.tsをimportしてTemporal Serverに登録
├── client/            # Client実装を格納（Workflowを起動するCLIアプリケーション）
│   └── sample-client.ts
└── settings.ts        # 環境、namespace、taskQueue名などの共通設定

docs/                  # ドキュメント
├── coding-guidelines.md
└── temporal/
    └── server.md

.claude/               # Claude設定
CLAUDE.md              # Claudeへの指示
README.md              # プロジェクトREADME
```

## 設計原則

- 機能ごとにworkflow/配下にサブディレクトリを作成し、実装と要件（README.md）を格納
- activities.ts と workflows.ts で全実装をエクスポートし、Workerで登録

# Assistant

## プロジェクト要件

- ソフトウェア的に自動化・省力化できるタスクを、ユーザーに代わって行うアシスタントアプリケーション
- 任意のソフトウェアタスクを統一された方法で実行・管理するためのサーバー常駐システムにより実現する

## ソフトウェア要件

- [Temporal](https://temporal.io) を利用する
- システムはサーバー常駐型であり、常時稼働する
- タスクは任意のトリガーによって実行される
  - 例：時刻トリガー、外部イベント、他タスクからの呼び出し、手動実行、等
- タスクは自身に実装された処理を実行する。途中経過や結果の出力先も、タスクの実装に依存する
- タスクの実装形式は、プログラムコードで直接記述される（システムの利用者が実装する）

## Temporalの設定

### アプリケーション

- サーバー:
  - Temporal Serverは常時起動しているRaspberry Pi OS上で、Temporalが提供するDockerにて実行する。（ https://docs.temporal.io/self-hosted-guide/deployment ）
    - Raspberry Piのスペックは十分なものであるという想定で良い
  - DBはデフォルトのものを用いる
- クライアント（タスク状態の確認）:
  - [Temporal Web UI](https://docs.temporal.io/web-ui) を利用する
- クライアント（タスクの実行）：
  - CLIアプリケーションとして本リポジトリで実装する
- Workflow及びActivity:
  - 本リポジトリで実装する
- Worker:
  - 本リポジトリで実装する

### 実装

- namespace:
  - namespaceは環境（ `development`, `staging`, `production` ）で分割する
- taskQueueName:
  - taskQueueNameはworkflowの操作対象で分割する
  - [discussion] workflowの優先順位や並列実行の可否により分割したい要望が生じたら、改めて検討する

## 実行

- Temporalサーバーの実行方法に関しては [server.md](docs/temporal/server.md) を参照

###

```sh
# インストール
$ yarn install

# Temporalクライアントの実行
$ yarn ts-node src/client/<client filename>
```

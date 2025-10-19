# Assistant

## プロジェクト要件

- ソフトウェア的に自動化・省力化できるタスクを、ユーザーに代わって行うアシスタントアプリケーション
- 任意のソフトウェアタスクを統一された方法で実行・管理するためのサーバー常駐システムにより実現する

## 基本動作

- [Temporal](https://temporal.io) を利用する
- システムはサーバー常駐型であり、常時稼働する
- タスクは任意のトリガーによって実行される
  - 例：時刻トリガー、外部イベント、他タスクからの呼び出し、手動実行、等
- タスクは自身に実装された処理を実行する。途中経過や結果の出力先も、タスクの実装に依存する
- タスクの実装形式は、プログラムコードで直接記述される（システムの利用者が実装する）

### Temporalの設定

- サーバー:
  - Temporal Serverは常時起動しているRaspberry Pi OS上で、Temporalが提供するDockerにて実行する。（ https://docs.temporal.io/self-hosted-guide/deployment ）
    - Raspberry Piのスペックは十分なものであるという想定で良い
  - DBはMySQLを用いる
- クライアント（タスク状態の確認）:
  - [Temporal Web UI](https://docs.temporal.io/web-ui) を利用する
- クライアント（タスクの実行）：
  - CLIアプリケーションとして本リポジトリで実装する
- Workflow及びActivity:
  - 本リポジトリで実装する
- Worker:
  - 本リポジトリで実装する

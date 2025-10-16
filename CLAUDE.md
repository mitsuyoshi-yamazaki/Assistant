## プロジェクト要件
- 任意のソフトウェアタスクを統一された方法で実行・管理するためのサーバー常駐システム（以下「管理システム」と呼ぶ）
- タスクを自由に定義できる実装の柔軟性を重視する

## 基本動作
- システムはサーバー常駐型であり、常時稼働する
- タスクは任意のトリガーによって実行される
  - 例：時刻トリガー、外部イベント、他タスクからの呼び出し、手動実行、等
- タスクは自身に実装された処理を実行する。途中経過や結果の出力先も、タスクの実装に依存する
- タスクの実装形式は、プログラムコードで直接記述される（システムの利用者が実装する）

## 技術選定
- [Temporal](https://temporal.io) を利用する
  - Temporalサーバー:
    - Temporal Serverは常時起動しているRaspberry Pi OS上で、Temporalが提供するDockerにて実行する。（ https://docs.temporal.io/self-hosted-guide/deployment ）
      - Raspberry Piのスペックは十分なものであるという想定で良い
    - DBはMySQLを用いる
  - Temporalクライアント:
    - [Temporal Web UI](https://docs.temporal.io/web-ui) を利用する
  - workflow:
    - workflowはTypeScriptで実装する

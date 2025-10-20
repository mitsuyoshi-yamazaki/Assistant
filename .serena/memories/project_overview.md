# プロジェクト概要

## 目的
ソフトウェア的に自動化・省力化できるタスクを、ユーザーに代わって行うアシスタントアプリケーション。任意のソフトウェアタスクを統一された方法で実行・管理するためのサーバー常駐システム。

## 技術スタック
- **言語**: TypeScript
- **ランタイム**: Node.js
- **主要フレームワーク**: Temporal (v1.13.1) - ワークフローエンジン
- **ビルドツール**: TypeScript Compiler (tsc)
- **テスティング**: Mocha
- **リンター**: ESLint
- **フォーマッター**: Prettier

## アーキテクチャ
- Temporal Serverはサーバー常駐型で常時稼働（Raspberry Pi OS上でDocker実行）
- Workflow及びActivityは本リポジトリで実装
- Workerは本リポジトリで実装
- CLIアプリケーションとしてクライアントを実装

## Temporalの設定
- **namespace**: 環境（development, staging, production）で分割
- **taskQueueName**: workflowの操作対象で分割

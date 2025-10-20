# データベースセットアップ

このドキュメントでは、ビジネスデータ永続化用のPostgreSQLデータベースのセットアップ手順を説明します。

## 概要

- データベース: PostgreSQL 17
- ORM: Prisma
- 実行環境: Docker (Raspberry Pi上で本番環境、開発環境共に使用)

## 環境構成

| 環境        | データベース名 | 説明                                |
| ----------- | -------------- | ----------------------------------- |
| development | assistant_dev  | 開発環境用DB                        |
| production  | assistant_prod | 本番環境用DB (Raspberry Pi上で実行) |

## セットアップ手順

### 1. 環境変数の設定

`.env.example` をコピーして `.env` ファイルを作成します:

```bash
cp .env.example .env
```

必要に応じて `.env` ファイルの値を編集してください:

```env
# Environment
ENVIRONMENT=development

# PostgreSQL Configuration
POSTGRES_USER=assistant
POSTGRES_PASSWORD=assistant_password
POSTGRES_DB=assistant_dev
POSTGRES_PORT=5432

# Database URL for Prisma
DATABASE_URL=postgresql://assistant:assistant_password@localhost:5432/assistant_dev?schema=public
```

**本番環境での設定:**

```env
ENVIRONMENT=production
POSTGRES_DB=assistant_prod
DATABASE_URL=postgresql://assistant:assistant_password@localhost:5432/assistant_prod?schema=public
```

### 2. PostgreSQLコンテナの起動

Docker Composeを使用してPostgreSQLコンテナを起動します:

```bash
docker compose up -d
```

コンテナの状態を確認:

```bash
docker compose ps
```

ログの確認:

```bash
docker compose logs -f postgres
```

### 3. Prisma Clientの生成

Prismaスキーマからクライアントコードを生成します:

```bash
yarn prisma:generate
```

### 4. 初回マイグレーションの実行

初期マイグレーションを作成・実行します（スキーマにモデルを追加した後に実行）:

```bash
yarn prisma:migrate:dev --name init
```

現時点では初期スキーマが空のため、モデルを追加してからマイグレーションを実行してください。

## 利用可能なコマンド

### Prisma関連

- `yarn prisma:generate` - Prisma Clientの生成
- `yarn prisma:migrate:dev` - マイグレーションの作成・実行（開発環境）
- `yarn prisma:migrate:deploy` - マイグレーションの実行（本番環境）
- `yarn prisma:studio` - Prisma Studio（GUI）の起動

### Docker関連

- `docker compose up -d` - PostgreSQLコンテナをバックグラウンドで起動
- `docker compose down` - コンテナの停止・削除
- `docker compose logs -f postgres` - ログの表示
- `docker compose restart postgres` - コンテナの再起動

## Activityからの利用方法

Activityからデータベースにアクセスするには、`src/lib/prisma.ts` からPrisma Clientをimportして使用します:

```typescript
import { prisma } from "../lib/prisma"

export const exampleActivity = async (data: ExampleData): Promise<void> => {
  // データの保存例
  await prisma.example.create({
    data: {
      name: data.name,
      value: data.value,
    },
  })

  // データの取得例
  const records = await prisma.example.findMany({
    where: {
      name: data.name,
    },
  })

  // ... 処理
}
```

## スキーマの編集

`prisma/schema.prisma` ファイルを編集してモデルを追加・変更します:

```prisma
model Example {
  id        String   @id @default(cuid())
  name      String
  value     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

スキーマを変更したら、以下のコマンドでマイグレーションを作成・適用します:

```bash
yarn prisma:migrate:dev --name <migration_name>
```

## トラブルシューティング

### コンテナが起動しない

ポートが既に使用されている可能性があります。`.env` ファイルで `POSTGRES_PORT` を変更してください。

### DATABASE_URLの設定エラー

`.env` ファイルが正しく読み込まれているか確認してください。また、`DATABASE_URL` の形式が正しいか確認してください。

### マイグレーションエラー

データベースの状態とマイグレーションファイルの整合性を確認してください。開発環境の場合、以下のコマンドでリセットできます:

```bash
yarn prisma migrate reset
```

**注意:** このコマンドはすべてのデータを削除します。

## データの永続化

データは Docker Volume (`postgres-data`) に保存されます。コンテナを削除してもデータは保持されます。

ボリュームを含めて完全に削除する場合:

```bash
docker compose down -v
```

## バックアップ・リカバリ

バックアップとリカバリの手順は今後定義します。

## テスト環境

テスト実行時はインメモリDBの使用を想定しています。テスト設定は今後定義します。

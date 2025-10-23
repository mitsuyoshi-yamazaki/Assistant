# Read it later

## 要件

- 後で読むべきものを集積し、メディアごとに分類し、後から見返すことができるようにまとめる
- インターネット経由でアクセスできる必要がある
- 情報を管理するだけではなく、見返す動機を作れるのが望ましい

### 参考となる既存サービス

- はてなブックマーク
  - インターネット上の任意の情報を記録・管理できる

## Workflow仕様

### addReadItLater

Read It Later項目を追加するWorkflow

#### 入力パラメータ

```typescript
{
  url: string           // 追加するURL（必須）
  description?: string  // URLの説明（任意）
  tags?: string[]       // タグ配列（任意）
}
```

#### 処理フロー

1. URLからカテゴリを判定
   - `youtube.com` または `youtu.be` を含む場合: `"youtube"`
   - それ以外: `"other"`
2. データベースに保存（Activity: `saveReadItLaterItem`）

#### 返り値

- 作成されたアイテムのID（string）

### 使用Activity

- `saveReadItLaterItem`: Read It Later項目をデータベースに保存する

# コーディングスタイルと規約

## TypeScript設定

- **strictモード**: 全て有効
- **target**: ES2022
- **module**: node16
- **rootDir**: ./src
- **outDir**: ./lib

## コーディング規約（docs/coding-guidelines.mdより）

### 一般原則

- 型によってデータ構造を表現（静的型チェック優先）
- インスタンスメンバや変数は可能な限りimmutable
- 早期returnを推奨
- ドキュメント、コメント、テストケース名は日本語
- パフォーマンスより規約を優先（影響がない限り）

### TypeScript特有

- 関数定義はfunctionではなくconstを優先
- Enumは使わず、Literal Union型もしくはDiscriminated Union型を使用
  - Discriminatorのプロパティ名は"case"（readonly修飾子付き）
- private変数は `_` から始まる
- forループの優先順位: forEach() > for-of > for(;;) > for-in
- nullチェックは `== null` または `!= null` を使用
- `as` より `satisfies` を優先

### コレクション操作

- 要素変更した新コレクション: `map()`
- 副作用のみ: `forEach()`
- フィルタ: `filter()`
- 集約: `reduce()`

### 非同期処理

- 順次実行: `for-of` + `await`
- 並列実行: `Promise.all()` + `map()`
- `forEach()`内で`await`は順次実行されない点に注意

### コメント

- 自明なコメントは記載しない
- メソッドシグネチャに含まれない情報のみ記載
- メソッド名と引数、返り値から自己説明されるメソッドにはコメント不要

### ブランド型（Nominal Type）

- IDなど演算に用いない値に使用
- 実装: `type UserId = string & { __brand: "UserId" }`

## テスト

- テストファイルは対象と同じディレクトリに `<ファイル名>.test.ts` で作成
- `it()` ではなく `test()` を使用

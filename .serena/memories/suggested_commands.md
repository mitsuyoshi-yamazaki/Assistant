# 推奨コマンド

## 開発コマンド

### インストール

```sh
yarn install
```

### ビルド

```sh
yarn build           # ビルド実行
yarn build.watch     # ビルド監視モード
```

### コード品質

```sh
yarn format          # Prettierでフォーマット
yarn lint            # ESLintでLint
```

### テスト

```sh
yarn test            # Mochaテスト実行
```

### 実行

```sh
yarn worker          # Workerを起動
yarn worker.watch    # Worker監視モード（nodemon使用）

# クライアント実行
yarn ts-node src/client/<client filename>
```

## Git コマンド（macOS Darwin）

```sh
git status
git add .
git commit -m "message"
git push
git pull
```

## システムコマンド（macOS Darwin）

- 標準的なUnixコマンドが使用可能（ls, cd, grep, find, cat等）

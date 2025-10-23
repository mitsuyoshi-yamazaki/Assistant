# Temporalサーバー

- https://docs.temporal.io/self-hosted-guide/deployment を参考に、実行デバイス上で https://github.com/temporalio/docker-compose をcloneして実行する

## よく利用する操作

```sh
# 開発サーバー
# https://learn.temporal.io/getting_started/typescript/dev_environment/

# DBファイル名付き, IP指定で起動（0.0.0.0ならローカルネットワーク経由のアクセスが可能）
$ temporal server start-dev --db-filename <DB filename> --ip <IP>

# namespaceの追加
$ temporal operator namespace create --namespace <namespace>
```

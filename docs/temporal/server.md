# Temporalサーバー

- https://docs.temporal.io/self-hosted-guide/deployment を参考に、実行デバイス上で https://github.com/temporalio/docker-compose をcloneして実行する

## よく利用する操作

```sh
# namespaceの追加
# TODO: Docker実行でも同じ操作で行えるか確認する
$ temporal operator namespace create --namespace <namespace>
```

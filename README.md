# docker-aws-util-cli

## run

```
docker run -v $(pwd):/work feenix/aws-util-cli:1.0.0
```

### requirements

1. run in git repo
1. git remote origin specified

## returns

json like

```json
{
    "project":"docker-aws-util-cli",
    "branch":"master",
    "isFeature":false,
    "isPr":false,
    "group":"docker",
    "env":"master",
    "account":"prod"
}
```
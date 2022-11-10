# 安装

## npm 安装

推荐使用 `npm` 的方式安装

```bash
npm i @k9/luban-cli -g
```

## 使用

项目初始化

```
luban-cli init
```

项目文档更新&发布 npm 包

```
npm publish
```

项目文档更新
若只更新文档和 demo，不需要重新发布 npm 包，可直接执行：

```
npm run build
```

如果在不发布组件包的情况下，查看生成的 dist,es,lib 目录，可执行命令：

```
luban-cli build --link links
```

## 问题

1 在 npm link 调试的时候，出现 eslint 的报错
Module Warning (from ./node_modules/eslint-loader/index.js):
error: Parsing error: The keyword 'const' is reserved
解决方法： 在项目中配置.eslintignore 文件 输出真实的包地址即可

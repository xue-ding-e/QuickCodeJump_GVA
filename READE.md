注意事项:
pnpm i dotenv

这部分更改文件路径和读取.env文件内容不能少了
```js
  const NODE_ENV = mode || 'development'
  const envFiles = [
    `.env.${NODE_ENV}`
  ]
  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file))
    for (const k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }
```

```js
插件顺序vue一定要在后面

plugins: [
  process.env.VITE_POSITION === 'open' && GvaPositionServer(),
  process.env.VITE_POSITION === 'open' && GvaPosition(),
  vuePlugin(),
]
```

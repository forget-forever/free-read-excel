# free-read-excel
方便的去读取excel文件

## example

```typescript
// 第二个参数是字段的映射，只有出现手动映射了的数据才会出现在res中
const res = await rendExcel<{name: string, id: number}>(file, {'姓名': 'name', '编号': 'id'})
```

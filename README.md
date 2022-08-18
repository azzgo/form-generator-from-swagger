# Swagger 2 Form

## 功能

- 通过 Swagger json 获取 api 调用方法
- 通过 Swagger 的 某个 DTO 生成 Vue 组件引用，可用于通用 Render

## 约定

- 简单 Schema: type 非 object 和 array 的 JSONSchema 对象

## TODO

- [X] 安装 依赖准备
  - [X] lodash + @types
  - [X] ajv 不确定是否有用
  - [X] formily
  - [X] vue composition-api
  - [X] swagger-js 解析 swagger.json
- [X] 找个测试用的 swagger.json
- [X] 实现 swaggerJson 中读取对应 JSON Schema 的能力
- [X] 解析 JSONSchema
  - [X] 对 简单 type[non array & object] 解析 -> Field + config | Widget + config
    - type 的解析规则 为 ${type}:${format}?${enum}
      - reference:   https://xrender.fun/form-render/api/inner-widget
    - 注：简单场景下，name 通过生成器随机生成不重名的 name
    - [X] 处理 type -> Field 的映射场景
    - [X] 处理 type + format 通用处理逻辑
    - [X] 处理 type + enum 场景
    - [X] 处理 type[void] 生成组件场景
  - [X] 对 type[object] 打散 Field + config 项数据
    - [X] 嵌套的 type[object]
  - [X] 处理 type[array] 场景通用处理
    - [X] 处理 type[array] + items
    - [-] 处理 type[array] + item[string?enum] 
    - [-] 多选场景处理  -> 到时结合组件吧，多选不同组件 collectionFormat: 'multi'
  - [-] 处理 简单 type[custom] 场景的组件渲染逻辑
  - [-] 处理 type[object|array custom] 非通用场景的处理逻辑
  - [X] 处理 type[void] 场景的处理逻辑
- [ ] Form 和 Field 
  - [ ] required
- [ ] 尝试返回不同的表单组件
- [ ] 尝试渲染

## NEXT

- [ ] 组件间的联动方案
  - [ ] 校验联动
  - [ ] 显隐联动
  - [ ] 数据联动
- [ ] 数据映射

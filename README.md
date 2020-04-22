### npm i
### npm run dev
### localhost:8080
### 项目中涉及从详情页返回后 需要保存首页feed流状态
1. 手动保存
   react-redux 在离开首页时保存到store中(componentWillUnmount), 返回时在 componentDidMount 通过判断store中list是否有数据进行渲染。
2. 参考KeepAlive (https://juejin.im/post/5d7edee9f265da03a9506701)
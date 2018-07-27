### react-mobx-demo

### 目录结构 ###
***
<pre>

├── docs                     // 每个人的开发文档 
├── dist                     // 项目build目录
├── agent.js                 // axios请求文件
├── .env                     // 启用装饰器配置文件
├── public                   // 项目入口文件以及icon文件
├── package.json             // 项目配置文件
├── src                      // 生产目录
│   ├── index.js             // js入口文件夹，打包入口文件
│   ├── app                  // 路由配置文件夹
│   ├── components           // 各种组件都存放此处
│   ├── stores               // mobx状态管理的store仓库
│   │   ├── DomainStore.js   // 数据相关的store
│   │   └── UIStore.js       // ui相关的store
│   ├── modules              // 所有的模块文件夹
│   │                        // 后期希望模块可以按照各个页面进行分类，比较方便
│   └── pages                // 页面管理文件夹
         └── ...files        // 所需要的页面文件
</pre>
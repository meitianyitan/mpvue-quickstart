# my-project
基于小程序开发框架mpvue官方脚手架整合优秀开源插件，使开发风格更接近Vue/Vuex

## 快速入手

``` bash
# 安装前请先确保全局环境下已安装node、npm和yarn
$ npm install -g vue-cli
$ vue init meitianyitan/mpvue-quickstart my-project
$ cd my-project
$ npm install
$ npm run dev
```

## Features

* 使用了[mpvue-entry](https://github.com/F-loat/mpvue-entry)
去除官方脚手架各个子页面的main.js，创建了pages.js，集中式页面配置，使开发更贴近vue风格。

* 使用[flyio](https://github.com/wendux/fly)并封装了请求
利用flyio同时支持浏览器、小程序、Node、Weex的基于Promise的跨平台http请求库。尽可能大限度的在多个端上实现代码复用。

* 使用[mpvue-router-patch](https://github.com/F-loat/mpvue-router-patch)
页面跳转直接可以用 vue-router 兼容的路由写法，开发体验更加接近Vue原生体验。

* 使用[minapp-api-promise](https://github.com/bigmeow/minapp-api-promise)
将所有异步微信小程序API promise化，支持then/catch、async/await的方式调用小程序API。

* 自动注册store
根据webpack的require.context及store的registerModule方法来自动注册store的modules，多人协作开发不需要担心代码冲突，不需要每个store.js都要import引入。

* 在 App.vue 页面中添加一些小程序页面快速布局的样式类
使用flex简单高效快速布局，并且兼容多设备端

## 文档
### 引入小程序组件库，以 vant-weapp 为例：

**下载**
直接通过 git 下载 Vant Weapp 源代码，并将dist目录拷贝到项目的 static/vant 目录下：
``` bash
git clone https://github.com/youzan/vant-weapp.git
```
**使用组件**
以按钮组件为例，只需要在 pages.js 文件中引入按钮对应的自定义组件即可

``` js
module.exports = [
  {
    path: 'pages/index', // 页面路径，同时是 vue 文件相对于 src 的路径
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '首页',
      // ++++++++++ 新加 +++++
      usingComponents: {
        "van-button": "/static/vant/button/index"
      }
    }
  }
]
```
接着就可以在组件直接使用：
```html
<van-button type="primary">按钮</van-button>
```

## Q&A

* vue文件中不能缺少script标签，否则会导致编译不了。

* slot插槽数据渲染有问题：https://github.com/Meituan-Dianping/mpvue/issues/427

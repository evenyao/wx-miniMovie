# miniMovie
以前使用 `jQuery` 实现过一个[移动端豆瓣电影](https://github.com/evenyao/douban-movie-mobile) `demo` ，最近把这个 `demo` 重写成了小程序版本。

## 细节
- 自定义 `tabbar`
- 页面间使用 `onLoad` `options` 传值
- `wx.setStorage` / `wx.getStorage` 存取数据
- 基于 `component` 和 `scroll` 的触底刷新
- `template` 模板

由于 豆瓣开发者 `Api` 已经关闭，并且小程序获取该 `Api` 会报 `403` 错误。因此使用 `https://douban.uieee.com/` 镜像代理地址。但 `搜索` 接口存在相应问题，所以只完成了 `热榜` 与 `北美` 两个页面。

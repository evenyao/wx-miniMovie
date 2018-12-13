# miniMovie
以前使用 `jQuery` 实现过一个[移动端豆瓣电影](https://github.com/evenyao/douban-movie-mobile) `demo` ，最近把这个 `demo` 重写成了小程序版本。

## 细节
- 自定义 `tabbar`
- 页面间使用 `onLoad` `options` 传值
- `wx.setStorage` / `wx.getStorage` 存取数据
- 基于 `component` 和 `scroll` 的触底刷新
- `template` 模板
- `swiper` 标签

由于 豆瓣开发者 `Api` 已经关闭，并且小程序获取该 `Api` 会报 `403` 错误。因此使用 `https://douban.uieee.com/` 镜像代理地址。但 `搜索` 接口存在相应问题，所以只完成了 `热榜` 与 `北美` 两个页面。

## 历史
> 2018.12.13

由于之前一直没有发现有详情页接口，所以使用了各种各样 传参/`storage` 的方式想把首页请求到的数据传给下一页，中间遇到各式各样的问题，后来发现居然有详情页接口，就采用传参带 `id` 方式完成了详情页的接口请求，同时也完成了详情页。但搜索接口仍有问题。

同时使用 `swiper` 来展现电影详情评论。

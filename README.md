# miniMovie
## 简介
以前学习库的时候使用 `jQuery` 实现过一个[移动端豆瓣电影](https://github.com/evenyao/douban-movie-mobile) `demo` ，由于最近接触小程序较多。将这个 `demo` 重写成了小程序版本。其中涵盖了一些小程序的设计细节，可以作为一个简单的项目来拓展构建。

## 线上版预览体验
![](https://evenyao-1257191344.cos.ap-chengdu.myqcloud.com/%E7%AE%80e%E7%94%B5%E5%BD%B1.jpg)

## 涉及细节
- 自定义 `tabbar`
- 页面间使用 `onLoad` `options` 传值
- `wx.setStorage` / `wx.getStorage` 存取数据
- 基于 `component` 和 `scroll` 的触底刷新
- `template` 模板
- `swiper` 标签

## 关于接口
~~由于 豆瓣开发者 `Api` 已经关闭，并且小程序获取该 `Api` 会报 `403` 错误。因此使用 `https://douban.uieee.com/` 镜像代理地址。但 `搜索` 接口存在相应问题，所以只完成了 `热榜` 与 `北美` 两个页面。~~

> 2018.12.14
由于豆瓣 `api` 限制了小程序直接 `request` 进行请求。
可使用 `nginx` 代理中转的方式将豆瓣的 `api` 通过其他服务器进行中专代理即可。
```
location /v2/ {
proxy_store off;
proxy_redirect off;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header Referer 'no-referrer-when-downgrade';
proxy_set_header User-Agent 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36';
proxy_connect_timeout 600;
proxy_read_timeout 600;
proxy_send_timeout 600;
proxy_pass https://api.douban.com/v2/;
}
```

## 历史
> 2018.12.13

由于之前一直没有发现有详情页接口，所以使用了各种各样 传参/`storage` 的方式想把首页请求到的数据传给下一页，中间遇到各式各样的问题，后来发现居然有详情页接口，就采用传参带 `id` 方式完成了详情页的接口请求，同时也完成了详情页。但搜索接口仍有问题。

同时使用 `swiper` 来展现电影详情评论。

> 2018.12.18

详情页中的视频片段没有使用 `video` 标签进行播放，因为后端接口是豆瓣的，做了外链播放限制。后来考虑到使用 `web-view` 到外部跳转成 `h5` 页面，但由于个人小程序限制 `web-view` 添加业务域名，因此此功能暂没有想到方法来解决。

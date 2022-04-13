---
slug: pod-install-proxy
title: pod install 和 gem install 如何走 proxy
authors: [ aweffr ]
tags: ["cocoapods", "pod", "React Native"]
---

## Motivation

今天新起了一个RN 0.68.1 的项目来调研Fabric能不能开起来战未来。顺便升级一下cocapods。发现常规的 HTTP_PROXY, HTTPS_PROXY 似乎 gem 和 pod 不遵守。
于是google了一下发现ruby系的要用小写的环境变量和参数。

## Method
1. 升级 cocoapods:
  - `sudo gem install --http-proxy http://127.0.0.1:<your port> cocoapods`

2. pod install:
  - `export http_proxy=http://127.0.0.1:<your port>`
  - `export https_proxy=http://127.0.0.1:<your port>`
  - `pod install`

通过查看proxy日志发现这样就生效了。

```log
...
2022/04/13 23:40:44 127.0.0.1:62226 accepted //cdn.jsdelivr.net:443 [out-0]
2022/04/13 23:40:44 127.0.0.1:62227 accepted //cdn.jsdelivr.net:443 [out-0]
2022/04/13 23:40:44 127.0.0.1:62228 accepted //cdn.jsdelivr.net:443 [out-0]
2022/04/13 23:40:49 127.0.0.1:62370 accepted //cdn.cocoapods.org:443 [out-0]
2022/04/13 23:40:53 127.0.0.1:62385 accepted //cdn.cocoapods.org:443 [out-0]
2022/04/13 23:40:53 127.0.0.1:62398 accepted //cdn.cocoapods.org:443 [out-0]
2022/04/13 23:40:53 127.0.0.1:62390 accepted //cdn.cocoapods.org:443 [out-0]
2022/04/13 23:40:53 127.0.0.1:62435 accepted //cdn.cocoapods.org:443 [out-0]
2022/04/13 23:40:53 127.0.0.1:62394 accepted //cdn.cocoapods.org:443 [out-0]
...
```

## 另: boost 安装问题
在安装中, pod install 一直在 boost(1.76.0) 上卡住。

通过 `pod install --verbose` 看到, 是卡在了用 curl下载 boost 的 release 包这一步上。
下载地址是固定的: `https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.bz2`
调试改地址发现地址会重定向到一个s3的带签名的下载地址上。然后本地折腾proxy环境变量无果。

遂决定走个捷径:

直接找到对应的 pod file, 我先浏览器下载一份, 搞一个http server可以curl下载的地址, 把地址给替换了。

通过搜索找到了pod file 位置: `./node_modules/react-native/third-party-podspecs/boost.podspec`

文件内容:
```podspec
...
spec.authors = 'Rene Rivera'
spec.source = { :http => 'https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.bz2',
                  :sha256 => 'f0397ba6e982c4450f27bf32a2a83292aba035b827a5623a14636ea583318c41' }
...
```

随手起个python http.server, 将文件的地址替换为 'http://127.0.0.1:5000/boost_1_76_0.tar.bz2' 后再`pod install`，顺利绕过了该问题。

## Reference
1. [StackOverflow: gem install by proxy](https://stackoverflow.com/questions/4418/how-do-i-update-ruby-gems-from-behind-a-proxy-isa-ntlm)
2. [StackOverflow: pod install proxy issue](https://stackoverflow.com/questions/30502855/pod-install-proxy-issue)

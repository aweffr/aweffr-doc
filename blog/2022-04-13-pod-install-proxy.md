---
slug: pod-install-proxy
title: pod install 和 gem install 如何走 proxy
authors: [ aweffr ]
tags: ["adb", "android", "React Native"]
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

## Reference
1. [StackOverflow: gem install by proxy](https://stackoverflow.com/questions/4418/how-do-i-update-ruby-gems-from-behind-a-proxy-isa-ntlm)
2. [StackOverflow: pod install proxy issue](https://stackoverflow.com/questions/30502855/pod-install-proxy-issue)

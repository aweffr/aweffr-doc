---
slug: adb-remote
title: adb远程连接方法
authors: [ aweffr ]
tags: ["adb", "android", "React Native"]
---

## Motivation

安卓测试机的插口已经有点接触不良了，稍微操作一下屏幕就会断开连接，但调试需要实时连接 RN的metro bundler端口8081, cable连接下调试老是断开，很烦。。

遂赶紧学习了一下Wifi 连接的新姿势，很简单

## Prerequisite

- adb
- 手机能正常cable连接到电脑进入adb shell
- 稳定的wifi, 建议开启DHCP静态IP分配, 在RN开发下会很方便

## Method

- 手机数据线连接电脑，确认adb能开启连接。
  - `adb devices`
- 手机和电脑连接上同一个wifi网络, 然后查找确认设备ip
  - `adb shell "ip addr show wlan0 | grep -e wlan0$ | cut -d\" \" -f 6 | cut -d/ -f 1"`
- 让设备监听端口，例：5555
  - `adb tcpip 5555`
- 断开数据线，然后用 adb connect 连接
  - `adb connect 192.168.31.102:5555`

至此，即可摆脱连接线的困扰。

## Reference
- [StackOverflow: How can i use adb over WiFi](https://stackoverflow.com/questions/42364380/how-can-i-use-adb-over-wifi)
- [Android Developer Doc: adb#wireless](https://developer.android.com/studio/command-line/adb#wireless)

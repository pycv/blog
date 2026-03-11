---
title: "用 AI 写 Chrome 插件，修一个 Bug 出两个 Bug"
date: 2026-03-12T02:35:00+08:00
draft: false
tags: ["吐槽", "AI编程", "Chrome"]
categories: ["随笔"]
---

用 AI 写代码这么久，发现一个问题：**只有在写 Chrome 插件的时候，AI 特别容易"修一个 Bug 出两个 Bug"**。

写普通项目的时候还好好的，一到 Chrome 插件就开始反复横跳。你让它修个 Bug，它给你修好了，顺便给你整出俩新的。你以为在进步，其实在原地打转。

## 举个栗子

- 你：按钮点不了
- AI：好的，我修了一下事件监听
- 你：按钮能点了，但 popup 打不开了
- AI：好的，我修了一下 popup
- 你：popup 能开了，但数据读不到了
- AI：好的，我修了一下 storage
- 你：数据能读了，但按钮又点不了了
- ... 无限循环

## 为什么 Chrome 插件特别容易这样？

我也想知道。所以我去问了 Gemini：[完整对话记录](https://gemini.google.com/share/cf9f420c11ed)

感觉可能和 Chrome 插件的架构有关——background、content script、popup 之间消息传来传去，AI 很难把握全局。它只看得到你说的那一个问题，改完就完事了。至于这个改动会不会把别的地方搞崩？它不在乎。

反正写 Chrome 插件用 AI，全程盯着验收就完事了。

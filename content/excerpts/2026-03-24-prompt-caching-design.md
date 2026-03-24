---
title: "Claude Code 的 Prompt Caching 设计哲学"
date: 2026-03-24T21:47:00+08:00
draft: false
tags: ["AI", "编程", "效率"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[Claude Code 的 Prompt Caching 设计哲学](https://mp.weixin.qq.com/s/1Gw9xpl1Y3NMP3lbOqNFxw)
>
> **推荐指数**：9/10（必读原文）

## 背景

这是一篇来自 Claude Code 团队的工程总结，解释为什么 Prompt Caching 不只是某个 API 的性能优化技巧，而是 Agent 产品的**系统设计约束**。一旦接受这个前提，很多"为什么 Claude Code 要这样实现"的细节都会突然变得合理。

## 核心观点

- **Prompt Caching 是前缀匹配**：前缀里任何改动都会让后面的缓存一起失效。这意味着 system prompt、工具定义、上下文结构必须尽量保持稳定
- **用消息承载变化，不要频繁修改 system prompt**：状态切换应该通过消息或专用工具表达，而不是改 prompt
- **Plan Mode 的正确实现**：不是切换工具集，而是通过 `EnterPlanMode`/`ExitPlanMode` 工具本身表示状态切换。工具定义始终不变，缓存前缀不被破坏
- **延迟展开工具**：请求里保留轻量级工具 stub，需要时通过 `ToolSearch` 加载完整 schema。缓存前缀保持稳定，昂贵定义按需注入

## 补充要点

- **Compaction 必须共享父会话前缀**：使用相同的 system prompt、工具定义、上下文结构，只在最后追加 compact 指令
- **保存 compaction buffer**：提前预留足够的上下文空间，确保 compact 请求和摘要都能放得下
- **不要在会话中途切模型**：模型切换会破坏缓存
- **监控缓存命中率**：像监控可用性和延迟一样认真对待

## 设计哲学

> 如果把这篇文章压缩成一句话，那就是：Prompt caching 不是某个 API 的性能优化技巧，而是 Agent 产品的系统设计约束。

对做 Agent 产品的人来说，最值得抄的不是某个孤立技巧，而是背后的工程态度：**先承认缓存约束是真实存在的，再围绕约束设计状态机、工具系统和上下文流转方式**。只有这样，长程、多轮、低延迟、可负担的 Agent 体验才有机会成立。

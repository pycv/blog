---
title: "Claude Code 架构学习资源：12 课掌握 AI Agent 核心设计"
date: 2026-03-24T21:45:00+08:00
draft: false
tags: ["AI", "编程", "开源"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[Claude Code 架构学习资源](https://mp.weixin.qq.com/s/Sy1MH5vuPGdgZbxutlsnbQ)
>
> **推荐指数**：8/10（推荐读原文）

## 背景

这是一个渐进式学习网站，通过 12 节课带你理解 Claude Code（Anthropic 的 AI 编程 Agent）的设计思路。每节课都从一个核心问题出发，展示如何用代码解决问题，代码量从 84 行逐步增长到 694 行。

## 核心观点

- **渐进式学习路径**：从 L1 到 L5 逐层递进，每一步都清晰可见，代码改动列得明明白白
- **问题驱动设计**：先戳痛点再给解药，让你明白为什么需要这个机制，不是堆砌概念
- **工具注册机制**：通过规范的注册机制像搭积木一样给 Agent 塞入各种工具函数（s02 Tools）
- **多层规划能力**：从简单的 TodoWrite（s03）到跨 Agent 共享的依赖感知任务板（s07 Tasks）

## 补充要点

- **s04 Subagents**：子 Agent 用独立的 messages[]，保持主对话干净
- **s05 Skills**：按需加载知识，不把所有规则塞进 System Prompt
- **s06 Compact**：三层压缩策略（滑动窗口、摘要压缩、选择性保留）实现无限会话
- **s08 Background Tasks**：后台线程 + 通知总线，非阻塞执行慢操作
- **s09-s12 协作层**：持久队友 + 异步邮箱、共享通信规则、自主认领任务、按目录隔离
- **Worktree + Task Isolation**：每个 Agent 在自己的目录工作，避免冲突

## 学习价值

学完这 12 课，你能理解 Claude Code 的设计思路，用任何语言（Python/Go/JS/TS/C++/Java）自己动手写一个 AI 编程 Agent。核心模式是语言无关的。

**网站地址**：https://learn.shareai.run/zh/

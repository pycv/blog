---
title: "Claude Code 源码泄露了，有人用 Python 复刻了一个极简版"
date: 2026-04-01T22:35:00+08:00
draft: false
tags: ["AI", "开源", "编程", "工具"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[Claude Code 源码泄露了，有人用Python复刻了一个极简版](https://mp.weixin.qq.com/s/hMGcR9shwmtTUos4ZiVhYg)
>
> **推荐指数**：9/10（必读原文）

## 背景

2026 年 3 月，Anthropic 在 npm 发布时不小心把 source map 一起打包进了生产版本，导致 57MB 的 `cli.js.map` 文件公开暴露——里面包含了 1906 个 TypeScript 源文件的完整内容。cc-mini 是社区基于这批泄露源码，用 Python 还原的极简复刻版本。

## 核心观点

- **源码泄露是低级失误**：`cli.js.map` 本质上是 JSON 文件，包含文件路径列表和完整源码，写个脚本就能批量还原全部 4756 个文件
- **泄露源码揭示了 Anthropic 未发布功能**：卧底模式（隐藏 AI 生成痕迹）、情绪监控（追踪用户爆粗口）、神秘模型 Capybara、KAIROS 永远在线 Agent 模块
- **cc-mini 是开源极简复刻版**：用 Python 重写核心逻辑，目标是让任何人都能读懂、改动、二次开发

## 补充要点

- **6 个内置工具**：Read、Write、Edit、Glob、Grep、Bash，权限分级（读操作自动放行，写操作需确认）
- **Skill 系统**：把高频操作固化成一行命令，支持项目专属 SKILL.md
- **KAIROS 自动记忆系统**：用 `/remember` 记录，`/dream` 整理成按话题分类的长期记忆文件
- **Sandbox 安全执行**：用 Linux 原生 bubblewrap 沙盒，文件系统只读，网络默认隔离
- **Coordinator 主从架构**：主线程负责软调度，Worker 线程负责具体执行，权限硬隔离
- **工程实践参考价值**：上下文压缩、Agent 长期记忆、MCP 工具调度、永远在线的 Agent 设计

---
title: "Claude Code Skills 完全指南：打造你的 AI 编程助手"
date: 2026-03-20T15:48:00+08:00
draft: false
tags: ["AI", "编程", "工具", "效率", "skills"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[Claude Code Skills 完全指南](https://mp.weixin.qq.com/s/STCdNggKNsW8PHCscLQ3Vw)
>
> **推荐指数**：8/10（推荐读原文）

## 背景

Claude Code 是 Anthropic 推出的 AI 编程助手，其核心能力来自 Skills（技能）系统。Skills 允许开发者定义定制化的行为、规则和工具，让 Claude 更好地理解项目上下文、遵循团队规范、执行复杂任务。本文是 Claude 官方团队的实践经验总结。

## 核心观点

- **Skills 是 Claude Code 的灵魂**：通过 Skills 可以定义 Claude 的行为边界、工具使用方式、代码风格偏好等，使其成为真正的"团队成员"而非通用工具

- **三种核心能力**：Skills 包含 Rules（规则）、Tools（工具）、Hooks（钩子）三大组件，分别控制 Claude 的思考方式、行动能力、和执行时机

- **从 Gotcha 开始**：最实用的 Skills 往往从简单的"陷阱提醒"开始，比如"不要删除测试数据"、"生产环境禁止 force push"等，逐步积累完善

## 补充要点

- **提供代码比让 Claude 自己写更高效**：将脚本和库交给 Claude，让它专注于组合和决策，而非重新构建基础代码

- **按需钩子（On Demand Hooks）**：只在需要时激活的钩子，比如 `/careful` 阻止危险操作、`/freeze` 限制编辑范围

- **Skills 分发**：小团队可直接检查到代码库（`./.claude/skills`），大团队可建立内部插件市场

- **衡量效果**：可通过 PreToolUse 钩子记录 Skills 使用情况，了解哪些受欢迎、哪些触发率低

- **组合 Skills**：Skills 之间可以相互依赖和引用，比如"CSV 生成"可以调用"文件上传"

## 技术细节

Skills 的三种核心组件：

| 组件 | 作用 | 示例 |
|------|------|------|
| Rules | 定义思考规则 | "使用 TypeScript 时优先用 interface 而非 type" |
| Tools | 提供 Bash 命令和脚本 | 数据抓取脚本、部署命令 |
| Hooks | 在特定时机触发 | 提交前检查、危险操作警告 |

**按需钩子示例**：
- `/careful` — 阻止 `rm -rf`、`DROP TABLE`、`force-push` 等危险操作
- `/freeze` — 限制只能在特定目录编辑，调试时防止"顺手修复无关内容"

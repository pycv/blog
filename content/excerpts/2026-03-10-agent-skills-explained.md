---
title: "什么是 Agent Skills？Claude 技能包机制详解"
date: 2026-03-10T20:38:00+08:00
draft: false
tags: ["AI", "工具", "效率"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[什么是 Agent Skills？](https://mp.weixin.qq.com/s/N8a8QkGamlt4aOb-3Gxqbw)
>
> **推荐指数**：5/10（只读摘录即可）

## 背景

一篇介绍 Agent Skills 概念的入门文章。Skills 是为 AI 智能体配置的预定义指令和最佳实践集合，本质是「带目录的说明书」，通过按需加载机制降低 Token 消耗。

## 核心观点

- **Skills = 可复用的提示词包**：把「一次性交代」的 Prompt 变成了可版本化、可共享的专业技能包
- **三层结构设计**：Metadata（目录/元数据）→ Instruction（正文/指令）→ Resource（附录/参考资料），按需加载，不一次性全喂给 AI
- **与 MCP 的区别**：MCP 解决「我能调用什么工具」，Skills 解决「我应该怎么做这件事才专业」

## 补充要点

- 文件结构：`SKILL.md`（必需）+ `reference.md`（可选）+ `examples/` + `scripts/`
- SKILL.md 顶部 frontmatter 可配置 `name`、`description`、`disable-model-invocation`、`allowed-tools` 等
- 导入方式：将 Skill 文件夹放入平台的 Skill 目录即可自动加载
- Skills 不是代码，是提示词；需要执行代码时配合 Function Calling
- 上下文窗口有限（Claude 约 200K tokens），Skills 不宜写太长
- 资源：Claude 官方 Skill 库（github.com/anthropics/skills）、社区（skillsmp.com）

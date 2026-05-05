---
title: "Open Design：Claude Design 的开源替代品"
date: 2026-05-05T21:51:22+08:00
draft: false
tags: ["开源", "设计", "AI", "工具"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[开源仅 5 天，暴涨 18.2K 标星！超牛的 Claude Design 开源替代品来了！](https://mp.weixin.qq.com/s/8HQ0LZkLN9xEGo5dsud0Ug)
>
> **推荐指数**：6/10（读重点章节）

## 背景

Anthropic 发布 Claude Design 后反响热烈，但仅限付费用户、闭源、数据必须上云。nexu.io 创始人 Tom Huang 随即开源了 Open Design，5 天斩获 18.2K 标星。核心思路：不造新 Agent，让你已有的编码代理（Claude Code、Codex、Cursor 等）直接变身设计引擎。

## 核心观点

- **不造 Agent，复用已有**：Open Design 不训练新模型，而是让现有的 coding agent CLI 充当设计引擎，本地优先、BYOK（自带密钥）
- **结构化设计流程**：AI 动笔前先交互式提问锁定需求，再从 5 套精选视觉方向中推荐，配合五维自省批判机制确保质量
- **129 套设计系统 + 31 个 Skills**：内置一线品牌设计语言（Linear、Stripe、Vercel 等），覆盖落地页、Dashboard、移动端、PPT 等场景

## 补充要点

- 支持 11 种 CLI 代理（Claude Code、Codex、Cursor、Gemini CLI、Qwen 等），无 CLI 时可用 OpenAI 兼容的 BYOK 代理兜底
- 沙盒预览，支持导出 HTML / PDF / PPTX / ZIP / Markdown
- 媒体生成：gpt-image-2 做海报、Seedance 2.0 做短视频、HyperFrames 做 HTML→MP4 动态图形
- 内置 93 条可复刻的 prompt gallery
- 技术栈：Node.js ~24 + pnpm，支持 macOS / Linux / WSL2

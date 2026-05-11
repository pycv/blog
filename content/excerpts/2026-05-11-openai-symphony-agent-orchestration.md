---
title: "OpenAI 开源 Symphony：让每个任务自动跑一个 AI Agent"
date: 2026-05-11T09:10:00+08:00
draft: false
tags: ["AI", "开源", "工具", "效率", "编程"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[OpenAI 开源 Symphony：让每个任务自动跑一个 AI Agent](https://mp.weixin.qq.com/s/PeshCGdpcMPmIcDSabSH_g?scene=334)
>
> **推荐指数**：9/10（必读原文）

## 背景

OpenAI 开源了 Symphony——一个把任务看板（Linear）变成 AI Agent 自动编排系统的工具。每个待办任务自动分配 Codex Agent，7×24 小时运行，工程师只需要审核结果。内部数据显示部分团队 PR 数量增长 500%，代表了 AI 编码从「人跟模型对话」走向「人给系统派活」的趋势。

## 核心观点

- **人的注意力是新瓶颈**：Codex 很强，但工程师同时只能管 3-5 个 Agent 会话，超过这个数效率直线下降。瓶颈不在 Agent，在人。
- **从管理会话到管理任务**：团队意识到围绕"编码会话"设计流程是错的。真正的组织单元是任务/需求/里程碑——让 Agent 从看板自己拉活。
- **给 Agent 目标而非步骤**：OpenAI 的关键教训是把 Agent 当状态机里的刚性节点行不通。给 Agent 目标、工具和上下文，让它自己推理怎么走。
- **Symphony 核心架构**：轮询 Linear 看板 → 每个任务分配独立工作区 → 自动重启 → 状态机驱动（5 个状态：Unclaimed→Claimed→Running→RetryQueued→Released）。
- **实际效果与代价**：PR 翻 5 倍，工作心理门槛大幅降低。但 Token 消耗巨大（14h/3.88亿 Token/~$1000），不适合模糊问题，需要完善的前置条件。

## 补充要点

- **依赖管理**：任务之间可设依赖关系，Agent 自动判断可并行和阻塞的任务。比如先迁移 Vite→再升级 React→再更新组件库。
- **Agent 能力进化路径**：最初只提交一个 PR → 处理 Code Review 反馈 → 关闭过期 PR → 分析代码库和文档做计划。
- **大仓库优势**：自动 rebase、解冲突、重试 CI 失败项，monorepo 特别受益。
- **"Symphony 构建 Symphony"**：开发团队把 Symphony 本身的任务拆成 Issue，让 Symphony 自己编排 Agent 完成，meta 度拉满。
- **技术本质是 Spec**：核心是一个 SPEC.md 文件，定义了 6 个组件 + 5 状态状态机，社区已基于 spec 做多种实现。
- **探索行为大幅增加**：当发起代码变更的代价趋近于零，人们开始更频繁做实验性尝试，只有 Google 级别内部工具链才能做到的事。
- **谁可以发起工作的边界变了**：产品经理和设计师直接往看板提需求就行，不用 checkout 代码库，描述完需求就能收到审核包。
- **失败即信号**：Agent 产出跑偏时不手动修补，而是加护栏、加技能、完善文档，让系统持续改进。


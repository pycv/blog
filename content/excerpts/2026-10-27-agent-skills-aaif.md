---
title: "Agent Skills 进了基金会：Agent 基础设施开始抢公共标准"
date: 2026-10-27T18:20:00+08:00
draft: false
tags: ["AI", "Agent", "开源", "趋势"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[刚刚，你每天在用的Skills发生了一件大事](https://mp.weixin.qq.com/s/1bI7Sy4_a1KRWIIKDRkn9Q)
>
> **推荐指数**：7/10（推荐读原文）

## 背景

Linux 基金会旗下的 Agentic AI Foundation（AAIF）一次接纳了四个项目：Anthropic 的 Agent Skills、OpenAI 的 Open Responses、Hugging Face 的 OpenEnv、阿里 的 OpenSandbox。覆盖 Agent 获取技能、调用模型、训练环境、隔离执行四个环节。AAIF 托管项目从 3 个增至 10 个，会员组织 305 家。

## 核心观点

- **四个项目各管一段**：Agent Skills 管「怎么按流程办事」，Open Responses 管「模型接口说同一种语言」，OpenEnv 管「训练环境可复用」，OpenSandbox 管「安全地动手执行」。
- **Anthropic 交的不只是规范**：名称、Logo、GitHub 组织、agentskills.io 域名一并交给基金会。不是交出 Claude 产品，而是把已成生态的开放标准交给中立治理。
- **为什么必须中立**：当标准被多平台采用，其他厂商会担心规则由谁定、原厂战略变了标准会不会跟着变。捐赠是降低这种顾虑的手段。
- **Open Responses 最值得盯**：它直接碰模型接口这块核心利益。接口标准化会削弱供应商锁定，开发者能按价格、性能、任务自由换模型。AWS 已公开支持并参与维护，Bedrock 也支持 Responses API。
- **不能只看发布会**：支持某个 API 不等于通过完整兼容性验证；名义归属变了，也不等于实际影响力分散。

## 补充要点

- Agent Skills 的形态是一份 `SKILL.md` 加脚本、参考资料，把代码规范、分析流程、文档模板打包成可复用说明书。
- Anthropic 披露：70 多个 Agent 平台集成，累计发布 100 万份 Skills，安装量近 2.8 亿次——这是厂商自报数据，非独立审计。
- 安全是最大变量：VirusTotal 10 月 21 日分析了 35,878 份技能样本，6,637 份判定为恶意，其中 62% 不含恶意代码，攻击指令直接写在自然语言文档里。
- 因此技能安全不只是杀毒，还包括指令审核、权限管理和执行环境隔离。
- Simon Willison 早在 2025 年 12 月就预判 Skills 会进 AAIF，同时指出规范细节不清：字段可自行扩展，不同 Agent 的支持程度不一，格式相同不代表行为兼容。
- 分析师的判断框架：看社区能否真正参与、决策是否透明、项目能否持续维护、有没有来自不同厂商的真实实现。
- AAIF 现有版图：MCP 连工具和数据、AGENTS.md 给项目级指令、Agent Skills 封装能力、Open Responses 统一接口、OpenEnv 管训练、OpenSandbox 管执行。
- 接下来半年到一年该看三件事：多少厂商真正采用、多少开发者参与规范演进、换模型或换执行环境时到底少改多少代码。

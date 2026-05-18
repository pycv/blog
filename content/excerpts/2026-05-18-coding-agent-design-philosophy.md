---
title: "Claude Code vs Codex：两家头部公司的 Coding Agent 设计哲学"
date: 2026-05-18T09:12:00+08:00
draft: false
tags: ["AI", "编程", "工具", "效率", "经验"]
categories: ["摘录"]
---

> 本文摘录整理自 Anthropic 和 OpenAI 官方文档。
>
> 原文来源：
> - Anthropic: [Best Practices for Claude Code](https://code.claude.com/docs/en/best-practices)
> - OpenAI: [Introducing Codex](https://openai.com/index/introducing-codex/)

## 背景

Claude Code 和 Codex 是目前最受关注的两款 coding agent。虽然使用方式有差异，但两家公司在官方文档中透露的设计哲学有高度一致性——而有些经验值得任何使用 AI 编码的人记住。

以下是原始文档中的关键 Quote 及解读。

---

## Anthropic（Claude Code 官方文档）

**来源**：[Best Practices for Claude Code](https://code.claude.com/docs/en/best-practices)

> **Quote ①**
> "Include tests, screenshots, or expected outputs so Claude can check itself. This is the single highest-leverage thing you can do."

**解读**：给验收标准是性价比最高的事。不给的话，AI 产出看起来对、跑起来不对的东西，每个错都得你亲自抓。

> **Quote ②**
> "Without clear success criteria, it might produce something that looks right but actually doesn't work. You become the only feedback loop, and every mistake requires your attention."

**具体做法**（同一页面的实践表）：告诉 AI "expected behavior → what 'fixed' looks like → scope of changes → verify against tests"。

> **Quote ③**
> "This matters since LLM performance degrades as context fills. When the context window is getting full, Claude may start 'forgetting' earlier instructions or making more mistakes."

**解读**：上下文堆满后 AI 会"失忆"、犯更多错。由此进一步提炼的经验是：**两次修正无效就清上下文重开，别在失败对话里硬掰**。

---

## OpenAI（Introducing Codex 官方博客）

**来源**：[Introducing Codex](https://openai.com/index/introducing-codex/)

> **Quote ④**
> "Like human developers, Codex agents perform best when provided with configured dev environments, reliable testing setups, and clear documentation."

**解读**：跟人类开发者一样，Codex 也需要清晰的文档、可靠的测试环境才能发挥好。**AGENTS.md** 文件就是 OpenAI 给 Codex 设计的"文档入口"。

> **Quote ⑤**
> "Codex provides verifiable evidence of its actions through citations of terminal logs and test outputs, allowing you to trace each step taken during task completion."

**解读**：验证不是信任，是 **traceability**。每个步骤都能追溯，你才能判断代码有没有问题。

> **Quote ⑥**
> "It still remains essential for users to manually review and validate all agent-generated code before integration and execution."

**解读**：核心原则：**方向始终在你手里**。通俗说法是"人 steering，AI execution"——AI 帮你踩油门，但它不知道前面是不是悬崖。

---

## 总结

两家文档围绕同一个核心展开，只是切入角度不同：

| | Anthropic 侧重 | OpenAI 侧重 |
|---|---|---|
| 核心理念 | 给 AI 自我验证的能力 | 让人对 AI 做验证 |
| 关键手段 | 验收标准、测试、上下文管理 | traceability、文档（AGENTS.md）、人工审核 |
| 共同结论 | **给 AI 写 prompt 和写文档一样重要** |

一句话：**先把测试写好，再把上下文管好，最后永远别把方向盘交给 AI。**

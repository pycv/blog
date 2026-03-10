---
title: "Linux零拷贝技术终极指南：mmap、sendfile、splice、MSG_ZEROCOPY一次讲透"
date: 2026-03-10T20:08:00+08:00
draft: false
tags: ["Linux", "C++", "编程"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[Linux零拷贝技术终极指南](https://mp.weixin.qq.com/s/--fMOnUWYIDRSZsKcWnLFw)
>
> **推荐指数**：8/10（推荐读原文）

## 背景

这篇文章系统讲解了 Linux 零拷贝技术，从传统 read+write 的 4 次数据拷贝、4 次上下文切换入手，逐一介绍 mmap、sendfile、splice、MSG_ZEROCOPY 四种零拷贝方案的原理、适用场景和限制。适合需要理解高性能 I/O 的后端开发者。

## 核心观点

- **传统 read+write 有多贵**：一次"读文件发网络"涉及 4 次上下文切换、4 次数据拷贝（2 次 DMA + 2 次 CPU），其中 2 次 CPU 拷贝是纯浪费
- **sendfile 是零拷贝起点**：Linux 2.1 引入，一个系统调用顶替 read+write，上下文切换从 4 次降到 2 次；配合 SG-DMA 网卡可做到 0 次 CPU 拷贝
- **splice 更灵活**：可在任意两个 fd 之间传数据（其中一个必须是 pipe），只传页面引用不传数据；Linux 2.6.23 后 sendfile 内部就是基于 splice 实现的
- **MSG_ZEROCOPY 让普通 send 也能零拷贝**：Linux 4.14 引入，适合需要先处理数据（加密/压缩）再发送的场景，但仅对大数据块（>10KB）有收益

## 补充要点

- mmap + write：减少一次 CPU 拷贝（从 4 次降到 3 次），但上下文切换还是 4 次
- sendfile 限制：输入必须是文件，输出必须是 socket
- Nginx 静态文件服务用 sendfile，配置 `sendfile on;`
- Kafka 消费者拉取消息用 sendfile，数据不进 JVM 堆，这是超高吞吐的核心原因之一
- MSG_ZEROCOPY 需要等内核通知才能安全修改 buf，编程模型更复杂
- 小数据场景（<10KB）用 MSG_ZEROCOPY 反而更慢，页面 pin/unpin 开销超过拷贝本身

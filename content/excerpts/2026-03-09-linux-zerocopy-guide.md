---
title: "Linux零拷贝技术终极指南：mmap、sendfile、splice、MSG_ZEROCOPY一次讲透"
date: 2026-03-09T19:45:00+08:00
draft: false
tags: ["Linux", "编程", "技术"]
categories: ["摘录"]
---

> 本文由 AI 自动摘录整理，原始链接：[Linux零拷贝技术终极指南](https://mp.weixin.qq.com/s/--fMOnUWYIDRSZsKcWnLFw)
>
> **推荐指数**：9/10（必读原文）

## 背景

从 Nginx 静态文件服务到 Kafka 百万级消息吞吐，零拷贝技术是高性能 I/O 的核心秘密。文章系统讲解了 Linux 中的四种零拷贝技术——mmap、sendfile、splice、MSG_ZEROCOPY——的原理、适用场景和选型建议，并配有清晰的数据流图示。

## 核心观点

- **传统 read+write 有 4 次拷贝**：2 次 DMA + 2 次 CPU 拷贝，其中 CPU 拷贝是纯浪费——数据经过用户空间却啥也没处理
- **零拷贝 ≠ 完全不拷贝**：零拷贝是指零 CPU 拷贝，DMA 拷贝（磁盘→内存、内存→网卡）始终存在，但由硬件完成
- **sendfile 是最常用的零拷贝**：一次系统调用顶 read+write，上下文切换从 4 次降到 2 次，配合 SG-DMA 网卡可实现零 CPU 拷贝
- **splice 更灵活但需要 pipe**：可在任意两个 fd 之间零拷贝传输，但其中一个必须是管道；Linux 2.6.23 后 sendfile 内部就是基于 splice 实现
- **MSG_ZEROCOPY 让普通 send 也能零拷贝**：适合需要先处理数据（加密/压缩）再发送的场景，但只对 >10KB 数据划算

## 补充要点

- **mmap 优化有限**：减少 1 次 CPU 拷贝，但上下文切换仍是 4 次，适合需要读写文件内容的场景
- **sendfile 限制**：输入必须是文件，输出必须是 socket
- **Nginx 配置**：`sendfile on;` + `tcp_nopush on;` 是静态文件服务的标配
- **Kafka 零拷贝**：通过 `FileChannel.transferTo()` 底层调用 sendfile，数据不进 JVM 堆
- **MSG_ZEROCOPY 注意**：需要通过 error queue 接收完成通知；若网卡不支持 SG-DMA 会静默退化为有拷贝模式
- **选型建议**：文件→网络用 sendfile；fd 间透传用 splice；需处理数据再发送且 >10KB 考虑 MSG_ZEROCOPY；读写文件用 mmap

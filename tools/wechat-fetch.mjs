#!/usr/bin/env node
/**
 * 微信文章抓取脚本
 * 用法: node wechat-fetch.mjs <url>
 * 输出: JSON { title, content, url }
 */

import { chromium } from 'playwright';
import { readFile } from 'fs/promises';

const url = process.argv[2];

if (!url) {
  console.error('Usage: node wechat-fetch.mjs <url>');
  process.exit(1);
}

async function fetchWechatArticle(url) {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/snap/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  try {
    // 访问页面
    await page.goto(url, { waitUntil: 'load', timeout: 20000 });
    // 等待内容容器
    await page.waitForSelector('#js_content, .rich_media_content', { timeout: 10000 }).catch(() => {});
    // 额外等待渲染
    await page.waitForTimeout(2000);

    // 等待内容加载
    await page.waitForSelector('#js_content, .rich_media_content', { timeout: 10000 });

    // 提取标题
    const title = await page.locator('#activity-name, .rich_media_title, h1').first().textContent()
      .then(t => t?.trim() || '')
      .catch(() => '');

    // 提取正文
    const content = await page.locator('#js_content, .rich_media_content').first().textContent()
      .then(t => t?.trim() || '')
      .catch(() => '');

    // 提取作者
    const author = await page.locator('.rich_media_meta_text, #js_author_name, .account_nickname').first().textContent()
      .then(t => t?.trim() || '')
      .catch(() => '');

    await browser.close();

    return {
      success: true,
      data: {
        title,
        content,
        author,
        url
      }
    };

  } catch (error) {
    await browser.close();
    return {
      success: false,
      error: error.message
    };
  }
}

const result = await fetchWechatArticle(url);
console.log(JSON.stringify(result, null, 2));

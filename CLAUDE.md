# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based static blog that auto-deploys to GitHub Pages via GitHub Actions.

- **Theme**: `hugo-theme-stack` (Git submodule)
- **URL**: https://pycv.github.io/blog/
- **Language**: `zh-cn`

For detailed documentation, see [博客维护指南.md](docs/博客维护指南.md).

## Quick Commands

```bash
# Create new content
hugo new content posts/my-post.md

# Local development (includes drafts)
hugo server -D --port 9000

# Build for production
hugo --minify

# Git workflow
git add . && git commit -m "message" && git push
```

## Front Matter Format

All content files use **TOML** front matter (wrapped in `+++`):

```toml
+++
title = "文章标题"
date = 2026-03-08T15:32:23+08:00
draft = false  # ⭐ Must be false to publish
description = "文章描述"
tags = ["标签1", "标签2"]
categories = ["分类"]
+++
```

**Critical**: Set `draft = false` or content won't be built.

## Key Files

- **hugo.toml** - Site configuration (baseURL, menu, theme)
- **content/posts/** - Blog posts (main section)
- **content/excerpts/** - Article excerpts
- **content/about/** - About page
- **.github/workflows/deploy.yml** - Auto-deployment pipeline
- **[docs/博客维护指南.md](docs/博客维护指南.md)** - Complete maintenance guide (Chinese)

## Git Workflow

- **Remote**: `git@github-pycv:pycv/blog.git`
- **Branch**: `main`
- **Auto-deploy**: Push to `main` triggers GitHub Actions (1-2 min)

## Content Structure

- **posts/** → Homepage display
- **excerpts/** → Excerpts section
- **about/** → About page
- Theme files are in `themes/hugo-theme-stack/` (do not edit directly)

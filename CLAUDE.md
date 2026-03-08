# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based static blog that auto-deploys to GitHub Pages via GitHub Actions. The blog uses the `hugo-theme-stack` theme (installed as a Git submodule) and targets `https://pycv.github.io/blog/`.

## Architecture

### Content Structure

- **content/posts/** - Blog posts (main content section)
- **content/excerpts/** - Article excerpts and notes
- **content/about/** - About page
- **themes/hugo-theme-stack/** - Theme (Git submodule, do not edit directly)

### Hugo Configuration

- **hugo.toml** - Main configuration file
  - Base URL: `https://pycv.github.io/blog/`
  - Language: `zh-cn`
  - Theme: `hugo-theme-stack`
  - Main content section: `posts`
  - Menu items configured: home, posts, excerpts, about

### Front Matter Format

All content files use TOML front matter (wrapped in `+++`):
```toml
+++
title = "文章标题"
date = 2026-03-08T15:32:23+08:00
draft = false
description = "文章描述"
tags = ["标签1", "标签2"]
categories = ["分类"]
+++
```

**Important**: Set `draft = false` to publish content. Draft posts are not built by default.

### Deployment Pipeline

GitHub Actions automatically deploys on push to `main` branch:
1. Triggers: `.github/workflows/deploy.yml`
2. Installs Hugo extended version
3. Runs `hugo --minify` (builds to `public/`)
4. Deploys `public/` to GitHub Pages

**Note**: The theme submodule is loaded automatically by the workflow (`submodules: recursive`).

## Development Commands

```bash
# Create new content
hugo new content posts/my-post.md

# Local development server (with drafts)
hugo server -D --port 9000
# Access at http://localhost:9000/

# Build for production
hugo --minify

# Theme management (Git submodule)
git submodule update --init --recursive
git submodule update --remote themes/hugo-theme-stack
```

## Git Workflow

- **Remote**: `git@github-pycv:pycv/blog.git`
- **Branch**: `main`
- **SSH config**: Uses `github-pycv` hostname alias in `~/.ssh/config`

Standard workflow:
1. Create/edit content in `content/`
2. Test locally with `hugo server -D --port 9000`
3. Commit and push: `git add . && git commit -m "message" && git push`
4. GitHub Actions auto-deploys in 1-2 minutes

## Creating New Content Sections

To add a new section (e.g., "portfolio", "resources"):

1. Create directory: `mkdir -p content/section-name`
2. Create index: `touch content/section-name/_index.md`
3. Add front matter to `_index.md`:
   ```toml
   +++
   title = "显示名称"
   date = 2026-03-08
   draft = false
   description = "描述"
   +++
   ```
4. Add menu entry to `hugo.toml`:
   ```toml
   [[menu.main]]
     identifier = "section-name"
     name = "显示名称"
     url = "/section-name/"
     weight = 5
   ```

## Important Files

- **hugo.toml** - Site configuration (baseURL, menu, theme params)
- **archetypes/default.md** - Template for new content
- **.github/workflows/deploy.yml** - Auto-deployment pipeline
- **docs/博客维护指南.md** - Comprehensive maintenance guide (Chinese)
- **tools/** - Custom utility scripts and tools

## Build Artifacts

- **public/** - Generated static site (gitignored)
- **resources/** - Hugo cache (gitignored)

## Content Guidelines

- Use Markdown for all content
- Use TOML front matter (not YAML)
- Set `draft = false` to publish
- Posts in `content/posts/` appear on homepage
- Use categories and tags for organization

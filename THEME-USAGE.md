# Stack 主题使用记录

> 当前博客使用了 `hugo-theme-stack` 主题，以下记录了所有用到的主题功能和自定义覆盖。
> 换主题时对照此清单，确保功能不断。

---

## 一、内容结构（跟主题无关，换主题也能保留）

| 内容 | 路径 | 说明 |
|------|------|------|
| 原创文章 | `content/posts/` | Hugo 标准内容目录 |
| 文章摘录 | `content/excerpts/` | 自定义 section，在 config 中注册为 `mainSections` |
| 关于页 | `content/about/index.md` | 独立页面 |
| Favicon | `static/favicon.ico` | 网站图标 |

---

## 二、Hugo 核心配置（换主题保留）

这些是 Hugo 原生配置，**与主题无关**：

| 配置项 | 当前值 | 作用 |
|--------|--------|------|
| `baseURL` | `https://pycv.github.io/blog/` | 站点 URL |
| `locale` | `zh-cn` | 语言 |
| **`enableGitInfo`** | **`true`** | 自动从 git 读取最后修改时间 |
| `pagination.pagerSize` | `10` | 每页文章数 |
| `summaryLength` | `30` | 摘要字数 |
| `taxonomies` | `categories` / `tags` | 分类法 |
| `markup.highlight` | 行号 + 无 class | 代码高亮 |
| `markup.goldmark.renderer.unsafe` | `true` | 允许 HTML |

---

## 三、Stack 主题功能（换主题可能需要替代）

### 3.1 主题参数（`[params]` 下）

| 参数 | 当前值 | 说明 | 换主题风险 |
|------|--------|------|-----------|
| `favicon` | `/favicon.ico` | 网站图标路径 | ✅ 通用 |
| **`mainSections`** | `["posts", "excerpts"]` | **额外注册了 excerpts 页面区** | ⚠️ 需要确认新主题是否支持自定义 section |
| `rssFullContent` | `true` | RSS 输出全文 | ✅ 通用 |
| **`sortBy`** | **`lastmod`** | 首页按最后修改时间排序 | ⚠️ 换了要改 |
| `params.footer.since` | `2026` | 页脚起始年份 | ✅ 通用 |
| `params.dateFormat.published` | `2006-01-02` | 发布日期的显示格式 | ⚠️ 路径可能不同 |
| `params.dateFormat.lastUpdated` | `2006-01-02` | 最后修改日期的显示格式 | ⚠️ 路径可能不同 |
| `params.sidebar.compact` | `false` | 侧边栏紧凑模式 | ❌ 主题专属 |
| `params.sidebar.subtitle` | `"记录技术与生活"` | 侧边栏副标题 | ⚠️ 路径可能不同 |
| `params.widgets.homepage` | 标签云 | 首页侧边栏组件 | ⚠️ 主题专属 |
| `params.widgets.posts` | 标签云 (限定 posts) | 文章页侧边栏组件 | ⚠️ 主题专属 |
| `params.widgets.excerpts` | 标签云 (限定 excerpts) | 摘录页侧边栏组件 | ⚠️ 主题专属 |
| `params.article.toc` | `true` | 文章目录 | ✅ 通用 |
| `params.article.readingTime` | `true` | 预计阅读时间 | ✅ 通用 |
| `params.colorScheme.toggle` | `true` | 明暗模式切换按钮 | ⚠️ 主题专属 |
| `params.colorScheme.default` | `auto` | 跟随系统偏好 | ✅ 通用 |
| `params.comments.enabled` | `false` | 评论区（关闭） | ✅ 通用 |

### 3.2 菜单配置（换主题保留，但配置路径可能不同）

| 菜单项 | 位置 | 图标 |
|--------|------|------|
| 首页 | `/` | `home` |
| 文章 | `/posts/` | `file-text` |
| 摘录 | `/excerpts/` | `book` |
| 关于 | `/about/` | `user` |

### 3.3 排序逻辑（关键！）

当前排序由 Stack 主题的 `layouts/_partials/helper/pages-sort.html` 实现：
```
判断 sortBy == "lastmod" → .ByLastmod.Reverse
```
Hugo 标准排序方式有：`.ByDate`、`.ByLastmod`、`.ByPublishDate`、`.ByTitle`、`.ByWeight`

---

## 四、自定义覆盖（换主题需迁移）

以下都是覆盖/扩展主题的文件，**换主题后需要手动迁移**：

### 4.1 Layout 覆盖（`layouts/`）

| 文件 | 作用 |
|------|------|
| `layouts/home.html` | 自定义首页模板 |
| `layouts/list.html` | 通用列表页（分类/标签页） |
| `layouts/excerpts/list.html` | 摘录页专属列表模板 |
| `layouts/_partials/article-list/default.html` | 文章卡片样式 |
| `layouts/_partials/head/custom.html` | 自定义 `<head>`（favicon 链接） |
| `layouts/_partials/widget/taxonomy.html` | 标签云组件 |
| `layouts/partials/pagination.html` | 分页栏组件 |

### 4.2 自定义样式（`assets/scss/custom.scss`）

包含：
- 🏷️ 标签云页面样式（`.terms-page`）
- 🏷️ 标签详情页样式（`.taxonomy-page`）
- 📄 分页栏样式（`.pagination`）
- 📐 响应式三栏布局优化
- 🟢 随笔标签青绿色样式

### 4.3 Archetype（`archetypes/default.md`）

新建文章时用的模板，配置了 `date`、`draft`、`title` 字段。

---

## 五、换主题 Checklist

1. **新主题是否支持 pagination + taxonomy？**
   - tags/categories 页面、分页

2. **新主题是否显示 .Lastmod？**
   - 需要用 Hugo 的 `.Lastmod` 变量
   - `enableGitInfo` 不需要改，Hugo 核心功能

3. **新主题是否支持自定义 sections？**
   - 当前有 `content/excerpts/` 这个非标准 section

4. **菜单能否有 4 个入口？**
   - 首页、文章、摘录、关于

5. **侧边栏是否有标签云 widget？**
   - 当前依赖标签导航

6. **迁移自定义样式**
   - 把 `assets/scss/custom.scss` 里的样式适配到新主题的 CSS 体系

7. **迁移自定义 layouts**
   - `layouts/` 下的 7 个文件需要按新主题的模板结构重写

# Zotero 9 护眼主题插件市场调研

> 调研日期：2026-08-25。结论基于公开 GitHub 仓库、发布记录、README 和可检索源码；它不是对所有闭源或未公开插件的穷举。

## 结论

市场上已经存在兼容 Zotero 9 的同类或相邻方案，因此不能宣称“首款”或“唯一”。不过，仍有清晰的差异化空间：一个只向 Zotero 9 原生主题面板加入精选护眼配色、没有额外按钮、不修改主界面、零依赖且可审计的轻量插件。

## 直接与相邻方案

### Zotero PDF Background

- 仓库：[q77190858/zotero-pdf-background](https://github.com/q77190858/zotero-pdf-background)
- 调研时约 267 stars，最新 Release 为 `v2.3.0`（2026-07-08）。
- 清单明确兼容 Zotero `9.0.*`。
- 提供工具栏按钮、多个背景、用户自定义颜色、分屏适配。
- 源码通过向 PDF `.textLayer` 注入背景 CSS 实现。
- README 明确写道 Zotero 8/9 已有主题选项，因此项目不再更新。

判断：最接近的直接竞品，功能更丰富；但实现更侵入，且已经进入停止维护状态。

### Night for Zotero 9

- 仓库：[Zhou-zc-sdu/zotero-night-version-9](https://github.com/Zhou-zc-sdu/zotero-night-version-9)
- 调研时约 2 stars，暂无 GitHub Release。
- 明确以 Zotero 9.0.6 为目标，由旧版 Night for Zotero 重构。
- 同时修改 Zotero 主界面和阅读器，提供 Original / Nord Dark / Black 三档快速切换。
- 使用阅读器原生 `setLightTheme` / `setDarkTheme` 接口，同时注入 UI 样式。

判断：属于全局夜间外观方案，覆盖面更广，但不是专注四种日夜护眼配色的极简预设包。

### Night for Zotero（原项目）

- 仓库：[tefkah/zotero-night](https://github.com/tefkah/zotero-night)
- 调研时约 2.4k stars；最新 Release `v0.4.23` 发布于 2023-06-25。
- 项目定位为 Zotero UI 与 PDF 夜间主题，原始版本早于 Zotero 9。

判断：知名历史方案；Zotero 9 支持主要来自社区分支，而不是原项目的当前正式 Release。

### Zotero Style

- 仓库：[MuiseDestiny/zotero-style](https://github.com/MuiseDestiny/zotero-style)
- 调研时约 5.2k stars，是大型 Zotero 外观与效率增强插件。

判断：属于相邻的综合外观产品，不是同等范围的独立护眼主题预设插件。

## 本项目的差异化

1. 直接使用 Zotero 9 的 `readerCustomThemes`，避免 PDF textLayer 覆盖层。
2. 只提供四个经过挑选、对比度明确的预设，不增加阅读器按钮或设置页。
3. 不改变 Zotero 文献管理主界面。
4. 不访问网络、文献或附件，运行时代码很小。
5. 处理安装、重启、禁用、重新启用与卸载生命周期，并保留用户已有主题。

## 发布文案边界

可以说：

- “A minimal native eye-care preset pack for Zotero 9.”
- “四种基于 Zotero 9 原生主题引擎的护眼配色。”

不应说：

- “第一款 Zotero 9 护眼插件。”
- “市场上唯一支持 Zotero 9 的背景插件。”


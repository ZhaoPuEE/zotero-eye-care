<p align="center">
  <img src="assets/hero.svg" alt="Zotero 护眼阅读：四种原生阅读主题" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/ZhaoPuEE/zotero-eye-care/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/ZhaoPuEE/zotero-eye-care?style=flat-square&color=6FA477" /></a>
  <img alt="Zotero" src="https://img.shields.io/badge/Zotero-9.0.x-CC2936?style=flat-square" />
  <img alt="Zero dependencies" src="https://img.shields.io/badge/dependencies-0-4A7C59?style=flat-square" />
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-4A5568?style=flat-square" /></a>
</p>

<p align="center"><strong>让论文背景柔和一点，让注意力留给内容。</strong></p>
<p align="center">简体中文 · <a href="README.en.md">English</a></p>

---

Zotero 护眼阅读是一个专为 **Zotero 9** 设计的轻量主题预设插件。它把四种经过挑选的配色直接加入 Zotero 阅读器原生的“外观 → 主题”面板，沿用 Zotero 的主题引擎和交互方式。

> Zotero 9 自带“原始、深色、黑色、雪色、棕褐”主题，也支持手动新增自定义主题。本插件在此基础上提供四个调校好的护眼预设，并自动处理安装、恢复、禁用和卸载时的主题管理。

<p align="center">
  <img src="assets/palette.svg" alt="淡豆沙绿、暖米黄、雾蓝灰、深灰夜读" width="860" />
</p>

## 四种阅读氛围

| 主题 | 背景 | 文字 | 对比度 | 适合场景 |
|---|---:|---:|---:|---|
| 淡豆沙绿 | `#DCEAD8` | `#26352A` | 10.34:1 | 长时间阅读、日间办公 |
| 暖米黄 | `#F5E9CE` | `#40372A` | 9.69:1 | 论文精读、暖光环境 |
| 雾蓝灰 | `#E3EBF1` | `#293742` | 10.13:1 | 冷色屏幕、图表密集页面 |
| 深灰夜读 | `#252A2E` | `#D7DDD9` | 10.51:1 | 夜间阅读、低照度环境 |

所有组合均超过 WCAG AA 正文对比度要求。图片、图表和批注保持原色。

## 主题效果

截图顺序为：左上淡豆沙绿、右上暖米黄、左下雾蓝灰、右下深灰夜读。

<p align="center">
  <img src="docs/screenshots/theme-gallery.jpg" alt="Zotero 9 中四种护眼主题的效果" width="100%" />
</p>

可以看到，页面和文字会随主题重新着色，而论文中的彩色图表仍保持原色。

## 为什么做得这么轻

- **原生体验**：主题出现在 Zotero 自带外观面板，切换、记忆和同步沿用原生机制。
- **原生着色**：调用 Zotero 9 阅读器主题引擎重新着色文字和页面。
- **阅读器范围**：适用于 PDF、EPUB 和网页快照，文献列表、侧栏和设置界面保持原样。
- **轻量运行**：零第三方依赖，主题切换完全在本地完成。
- **兼容现有设置**：保留用户已有自定义主题；禁用或卸载时只清理本插件的四项。

## 安装

1. 从 [Latest Release](https://github.com/ZhaoPuEE/zotero-eye-care/releases/latest) 下载 `zotero-eye-care-1.0.0.xpi`。
2. 打开 Zotero，进入 **工具 → 插件**。
3. 点击右上角齿轮，选择 **从文件安装插件**。
4. 选择下载的 XPI；如有提示，重启 Zotero。
5. 打开文献，在阅读器工具栏点击 **外观**，选择新增主题。

## 使用方法

打开 PDF、EPUB 或网页快照后：

1. 点击阅读器顶部工具栏中的 **外观（Aa）**。
2. 在 **主题** 区域选择“淡豆沙绿、暖米黄、雾蓝灰、深灰夜读”之一。
3. 主题立即生效，并由 Zotero 原生机制记住；再次点击同一入口即可随时切换。

<p align="center">
  <img src="docs/screenshots/theme-picker.jpg" alt="在 Zotero 原生外观面板中选择护眼主题" width="100%" />
</p>

> 面板中的“原始、深色、黑色、雪色、棕褐”是 Zotero 自带主题；下面四个护眼主题由本插件添加。你仍然可以点击“+”使用 Zotero 自带的自定义主题功能。

> 已针对 macOS 上的 Zotero 9.0.6 完成安装、切换、重启持久化、禁用清理和重新启用测试。清单兼容范围为 Zotero `9.0.x`。

## 市场定位

本插件的定位是：**基于 Zotero 9 原生主题能力的极简护眼预设包**。

| 方案 | Zotero 9 | 实现路线 | 范围 | 当前定位 |
|---|---|---|---|---|
| **Zotero 护眼阅读** | ✅ | 原生自定义主题 | 阅读器 | 四色、极简、零依赖 |
| [Zotero PDF Background](https://github.com/q77190858/zotero-pdf-background) | ✅ | 注入 PDF textLayer CSS | PDF | 功能更全，但作者已说明不再更新 |
| [Night for Zotero 9](https://github.com/Zhou-zc-sdu/zotero-night-version-9) | ✅ | 原生主题 + UI 样式 | 主界面与阅读器 | Nord 夜间风格、三档切换 |
| Zotero 9 原生 | ✅ | 内置主题引擎 | 阅读器 | 有默认主题和手动自定义，没有这组预设 |

完整调研、检索范围和证据见 [市场调研](docs/MARKET_RESEARCH.md)。

## 开发

无需安装第三方依赖：

```sh
node tests/theme-presets.test.mjs
./build.sh
```

产物位于 `dist/zotero-eye-care-1.0.0.xpi`。持续集成会验证主题合并/清理逻辑、JavaScript 语法、清单 JSON 和 XPI 结构。

## 隐私与权限

插件的运行范围仅限 Zotero 原生的 `readerCustomThemes` 设置，不需要网络、文献库或附件访问权限。

## 许可证

[MIT](LICENSE) © 2026 ZhaoPuEE

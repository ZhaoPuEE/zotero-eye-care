# Zotero 10 兼容性调研报告

> 结论：**插件代码与 Zotero 10 完全 API 兼容，唯一的阻塞点是清单中的版本范围（`strict_max_version: "9.0.*"`）。** 本次发布（1.1.0）将兼容范围扩展至 `10.0.*`。

- 调研日期：2026-08-30
- 目标：Zotero 10.0.x（当前稳定版 10.0.1，发布于 2026-08-24）
- 对比基线：Zotero 9.0.x（本插件 1.0.0 的目标版本）

## 1. 插件实际使用的 Zotero API 面

本插件（`bootstrap.js` + `content/theme-presets.js`）只触碰以下 Zotero API：

| API | 用途 |
|---|---|
| `Zotero.initializationPromise` | 等待 Zotero 初始化完成 |
| `Zotero.Libraries.userLibraryID` | 定位用户文献库 |
| `Zotero.SyncedSettings.get / set / clear(libraryID, key, value)` | 读写 `readerCustomThemes` 同步设置 |
| `Zotero.Prefs.get / clear` | 读取/清除 `reader.lightTheme`、`reader.darkTheme` |
| `Zotero.debug` | 日志 |
| `Services.scriptloader.loadSubScript` | 加载插件脚本（Mozilla 平台 API） |

插件**没有**使用 `ZoteroPane`、`ItemTree`、`Zotero.Search`、`Zotero.HTTP`、`CookieSandbox`、FTL 本地化等 Zotero 10 改动涉及的模块。

## 2. 对照官方 Zotero 10 开发者变更清单

依据 [Zotero 10 for Developers](https://www.zotero.org/support/dev/zotero_10_for_developers)（最后更新 2026-08-20），Zotero 10 的开发者相关变更包括：

- 与 Zotero 9 相同的 Firefox 140 ESR 基线 → **Mozilla 平台 API（含 `Services.scriptloader.loadSubScript`）无变化**
- 文献列表多选：单一选择 getter（`getSelectedCollection()` 等）改为抛出 → **不影响本插件**
- `ItemTree#collectionTreeRow` 移除，改为 `viewMode` → **不影响本插件**
- 菜单上下文、文献列表库头行 → **不影响本插件**
- 搜索 API / 全文搜索（FTS5）重写 → **不影响本插件**
- Undo/redo（`saveTx({ undoAction })`）→ **不影响本插件**
- 本地 HTTP 服务器与本地 API 加固 → **不影响本插件**
- 条目数据校验加强 → **不影响本插件**
- 数据库 WAL 模式、影子列 → **不影响本插件**
- ItemTree 重构、CookieSandbox 移除、本地化重构、`HTTP.download()` 返回值变化 → **均不影响本插件**

变更清单中**没有任何一项**涉及 `SyncedSettings`、`Prefs`、`Libraries` 或阅读器自定义主题。

## 3. 源码级验证（Zotero 当前开发分支）

直接核对 `zotero/zotero` 主分支（`11.0.SOURCE`）与 `zotero/reader`（PDF 阅读器捆绑包）源码：

| 检查项 | 结果 |
|---|---|
| `xpcom/syncedSettings.js` 仍提供 `get(libraryID, setting)` / `set(libraryID, setting, value)` / `clear` | ✅ 未变 |
| `xpcom/prefs.js` 仍提供 `get` / `set` / `clear`，且仍执行 `reader.customThemes` → `readerCustomThemes` 迁移 | ✅ 未变 |
| `xpcom/reader.js` 仍用 `Zotero.SyncedSettings.get/set/clear(Zotero.Libraries.userLibraryID, 'readerCustomThemes', …)` | ✅ 未变 |
| `reader.lightTheme` / `reader.darkTheme` 偏好键 | ✅ 未变 |
| `xpcom/zotero.js` 仍暴露 `Zotero.initializationPromise` | ✅ 未变 |
| 阅读器自定义主题结构 `{ id, label, background, foreground, invertImages }`（`zotero/reader` 的 theme-popup） | ✅ 未变 |
| 阅读器自动生成的主题 ID 仍为 `custom1`、`custom2`…（与本插件 `zotero-eye-care-*` ID 不冲突） | ✅ 未变 |

## 4. 真正的“不兼容”是什么

Zotero 通过插件清单的 `applications.zotero.strict_min_version` / `strict_max_version` 决定插件能否在当前应用版本上启用（由 Mozilla AddonManager 层执行）。本插件 1.0.0 声明：

```json
"strict_min_version": "9.0",
"strict_max_version": "9.0.*"
```

在 Zotero 10 上安装/启用时，AddonManager 会因 `10.0.x > 9.0.*` 而**拒绝安装并禁用插件**——即官方文档和 [论坛讨论](https://forums.zotero.org/discussion/133127/frequent-major-version-changes-and-the-current-plugin-compatibility-model) 所称的“行政性不兼容”（administrative incompatibility）：代码本身兼容，但版本号门槛挡住了。

Zotero 10 官方开发文档明确给出了处理方式：

> After confirming that your plugin is compatible, update `strict_max_version` in your manifest.json to `10.0.*`.

## 5. 本次改动

- `manifest.json`：`strict_max_version` `9.0.*` → `10.0.*`；版本号 1.0.0 → 1.1.0；描述更新为 Zotero 9 与 10。
- `updates.json`：新增 1.1.0 条目，版本范围为 `9.0` – `10.0.*`，附新 XPI 的 SHA-256。
- `build.sh` / CI / README / 安装文档 / 变更日志 / 发布说明同步更新。
- `strict_min_version` 保持 `9.0`（插件仅在 Zotero 9.0.x 上做过真机测试；虽然所用 API 自 Zotero 7 起即存在，但不扩大未经验证的声明范围）。

## 6. 验证建议

1. 在 Zotero 10.0.x 上安装 `zotero-eye-care-1.1.0.xpi`，确认可安装、四主题出现在“外观 → 主题”面板。
2. 切换主题、重启 Zotero，确认持久化；关闭/禁用插件，确认四项预设被清理；重新启用，确认恢复。
3. 开启同步后确认 `readerCustomThemes` 跨设备同步行为与 Zotero 9 一致。

## 参考资料

- [Zotero 10 for Developers](https://www.zotero.org/support/dev/zotero_10_for_developers)
- [Zotero 9 for Developers](https://www.zotero.org/support/dev/zotero_9_for_developers)
- [Zotero 10 发布博客](https://www.zotero.org/blog/zotero-10/)
- [Zotero Version History](https://www.zotero.org/support/changelog)
- [Frequent major-version changes and the current plugin compatibility model](https://forums.zotero.org/discussion/133127/frequent-major-version-changes-and-the-current-plugin-compatibility-model)
- 源码：`zotero/zotero`（main，`11.0.SOURCE`）、`zotero/reader`（main）

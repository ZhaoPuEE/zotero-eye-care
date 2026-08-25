<p align="center">
  <img src="assets/hero.svg" alt="Zotero Eye Care — four native reading themes" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/ZhaoPuEE/zotero-eye-care/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/ZhaoPuEE/zotero-eye-care?style=flat-square&color=6FA477" /></a>
  <img alt="Zotero" src="https://img.shields.io/badge/Zotero-9.0.x-CC2936?style=flat-square" />
  <img alt="Zero dependencies" src="https://img.shields.io/badge/dependencies-0-4A7C59?style=flat-square" />
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-4A5568?style=flat-square" /></a>
</p>

<p align="center"><strong>Softer pages. More attention for the paper.</strong></p>
<p align="center"><a href="README.md">简体中文</a> · English</p>

---

Zotero Eye Care is a tiny theme-preset plugin built specifically for **Zotero 9**. It adds four carefully selected palettes to Zotero Reader's native **Appearance → Themes** panel—without floating buttons, translucent PDF overlays, or changes to the library UI.

> **To be clear: Zotero 9 already includes Original, Dark, Black, Snow, and Sepia themes, and it already lets users create custom themes.** This plugin does not replace those features. It adds four tuned eye-care presets and manages their installation, recovery, disable, and uninstall lifecycle.

<p align="center">
  <img src="assets/palette.svg" alt="Soft Green, Warm Paper, Mist Blue, and Night Gray" width="860" />
</p>

## Four reading moods

| Theme | Background | Text | Contrast | Best for |
|---|---:|---:|---:|---|
| Soft Green | `#DCEAD8` | `#26352A` | 10.34:1 | Long daytime reading |
| Warm Paper | `#F5E9CE` | `#40372A` | 9.69:1 | Close reading and warm lighting |
| Mist Blue | `#E3EBF1` | `#293742` | 10.13:1 | Cool displays and figure-heavy papers |
| Night Gray | `#252A2E` | `#D7DDD9` | 10.51:1 | Low-light and nighttime reading |

Every pair exceeds WCAG AA contrast for body text. Images, figures, and annotations keep their original colors.

## Real screenshots

These are genuine Zotero 9.0.6 screenshots, not mockups. Clockwise from the top left: Soft Green, Warm Paper, Night Gray, and Mist Blue. Private Zotero tabs were cropped out.

<p align="center">
  <img src="docs/screenshots/theme-gallery.jpg" alt="All four Zotero Eye Care themes running in Zotero 9" width="100%" />
</p>

The page and text are recolored by Zotero's native reader engine, while colored figures remain intact.

## Why it stays tiny

- **Native by design** — themes live in Zotero's own Appearance panel and use its persistence and sync behavior.
- **No overlay tricks** — Zotero 9's reader theme engine recolors the page and text.
- **Reader only** — works with PDF, EPUB, and web snapshots without recoloring the library UI.
- **Zero dependencies, zero network access** — no document, attachment, or personal-data access.
- **Clean lifecycle** — existing custom themes are preserved; disable or uninstall removes only these four presets.

## Install

1. Download `zotero-eye-care-1.0.0.xpi` from the [latest release](https://github.com/ZhaoPuEE/zotero-eye-care/releases/latest).
2. In Zotero, open **Tools → Plugins**.
3. Click the gear menu and choose **Install Plugin From File**.
4. Select the XPI and restart Zotero if prompted.
5. Open a document, click **Appearance**, and pick a new theme.

## Use

After opening a PDF, EPUB, or web snapshot:

1. Click **Appearance (Aa)** in the reader toolbar.
2. Under **Themes**, choose Soft Green, Warm Paper, Mist Blue, or Night Gray.
3. The change applies immediately and Zotero remembers it through its native preference system.

<p align="center">
  <img src="docs/screenshots/theme-picker.jpg" alt="Selecting an Eye Care preset in Zotero's native Appearance panel" width="100%" />
</p>

> Original, Dark, Black, Snow, and Sepia are built into Zotero. The four eye-care presets below them come from this plugin. Zotero's own “+” button remains available for manual custom themes.

> Tested on Zotero 9.0.6 for macOS: installation, all four live theme switches, restart persistence, disable cleanup, and re-enable recovery. The manifest currently targets Zotero `9.0.x`.

## Market position

This is not the first attempt at a calmer Zotero reading background. It occupies a narrower niche: **a minimal, curated preset pack built directly on Zotero 9's native theme system**.

| Option | Zotero 9 | Approach | Scope | Position |
|---|---|---|---|---|
| **Zotero Eye Care** | ✅ | Native custom themes | Reader | Four palettes, minimal, zero dependencies |
| [Zotero PDF Background](https://github.com/q77190858/zotero-pdf-background) | ✅ | Injected PDF text-layer CSS | PDF | More controls; README says maintenance has ended |
| [Night for Zotero 9](https://github.com/Zhou-zc-sdu/zotero-night-version-9) | ✅ | Native themes + UI CSS | App and reader | Nord-style UI with three reader modes |
| Zotero 9 built-in | ✅ | Built-in theme engine | Reader | Defaults and manual custom themes, but not this curated set |

See [Market research](docs/MARKET_RESEARCH.md) for the search scope and evidence.

## Develop

No third-party dependencies are required:

```sh
node tests/theme-presets.test.mjs
./build.sh
```

The XPI is written to `dist/zotero-eye-care-1.0.0.xpi`. CI verifies merge/cleanup behavior, JavaScript syntax, manifest JSON, and archive integrity.

## Privacy

The plugin only updates Zotero's native `readerCustomThemes` setting. It does not read your library or attachments and makes no network requests.

## License

[MIT](LICENSE) © 2026 ZhaoPuEE

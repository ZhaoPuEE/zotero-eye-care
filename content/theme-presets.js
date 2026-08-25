/* global Zotero */

var EyeCareThemes = (() => {
  "use strict";

  const SETTINGS_KEY = "readerCustomThemes";
  const THEME_PREFIX = "zotero-eye-care-";

  const PRESETS = Object.freeze([
    Object.freeze({
      id: `${THEME_PREFIX}green`,
      label: "淡豆沙绿",
      background: "#DCEAD8",
      foreground: "#26352A",
      invertImages: false,
    }),
    Object.freeze({
      id: `${THEME_PREFIX}warm-yellow`,
      label: "暖米黄",
      background: "#F5E9CE",
      foreground: "#40372A",
      invertImages: false,
    }),
    Object.freeze({
      id: `${THEME_PREFIX}mist-blue`,
      label: "雾蓝灰",
      background: "#E3EBF1",
      foreground: "#293742",
      invertImages: false,
    }),
    Object.freeze({
      id: `${THEME_PREFIX}night-gray`,
      label: "深灰夜读",
      background: "#252A2E",
      foreground: "#D7DDD9",
      invertImages: false,
    }),
  ]);

  const OWNED_IDS = new Set(PRESETS.map((preset) => preset.id));

  function normalizeThemes(themes) {
    return Array.isArray(themes) ? themes : [];
  }

  function mergePresets(themes) {
    const existing = normalizeThemes(themes);
    const existingIDs = new Set(existing.map((theme) => theme?.id));
    const missing = PRESETS.filter((preset) => !existingIDs.has(preset.id));

    return {
      themes: [...existing, ...missing.map((preset) => ({ ...preset }))],
      added: missing.length,
    };
  }

  function removePresets(themes) {
    return normalizeThemes(themes).filter(
      (theme) => !OWNED_IDS.has(theme?.id),
    );
  }

  function isOwnedTheme(themeID) {
    return OWNED_IDS.has(themeID);
  }

  async function saveThemes(zotero, themes) {
    const libraryID = zotero.Libraries.userLibraryID;
    if (themes.length) {
      await zotero.SyncedSettings.set(libraryID, SETTINGS_KEY, themes);
    } else {
      await zotero.SyncedSettings.clear(libraryID, SETTINGS_KEY);
    }
  }

  async function installIntoZotero(zotero) {
    const libraryID = zotero.Libraries.userLibraryID;
    const current = zotero.SyncedSettings.get(libraryID, SETTINGS_KEY);
    const merged = mergePresets(current);

    if (merged.added) {
      await saveThemes(zotero, merged.themes);
    }

    return merged;
  }

  async function removeFromZotero(zotero) {
    for (const pref of ["reader.lightTheme", "reader.darkTheme"]) {
      const selectedTheme = zotero.Prefs.get(pref);
      if (isOwnedTheme(selectedTheme)) {
        zotero.Prefs.clear(pref);
      }
    }

    const libraryID = zotero.Libraries.userLibraryID;
    const current = normalizeThemes(
      zotero.SyncedSettings.get(libraryID, SETTINGS_KEY),
    );
    const remaining = removePresets(current);

    if (remaining.length !== current.length) {
      await saveThemes(zotero, remaining);
    }

    return { removed: current.length - remaining.length };
  }

  return Object.freeze({
    PRESETS,
    SETTINGS_KEY,
    isOwnedTheme,
    mergePresets,
    removePresets,
    installIntoZotero,
    removeFromZotero,
  });
})();


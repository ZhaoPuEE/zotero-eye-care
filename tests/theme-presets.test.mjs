import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const source = readFileSync(
  new URL("../content/theme-presets.js", import.meta.url),
  "utf8",
);
const context = {};
runInNewContext(source, context);
const manager = context.EyeCareThemes;
const plain = (value) => JSON.parse(JSON.stringify(value));

assert.equal(manager.PRESETS.length, 4);
assert.equal(new Set(manager.PRESETS.map((theme) => theme.id)).size, 4);

for (const theme of manager.PRESETS) {
  assert.match(theme.id, /^zotero-eye-care-/);
  assert.match(theme.background, /^#[0-9A-F]{6}$/);
  assert.match(theme.foreground, /^#[0-9A-F]{6}$/);
  assert.equal(theme.invertImages, false);
}

const userTheme = {
  id: "user-theme",
  label: "用户主题",
  background: "#FFFFFF",
  foreground: "#000000",
};
const firstMerge = manager.mergePresets([userTheme]);
assert.equal(firstMerge.added, 4);
assert.equal(firstMerge.themes.length, 5);
assert.equal(firstMerge.themes[0], userTheme);

const editedPluginTheme = {
  ...manager.PRESETS[0],
  background: "#ABCDEF",
};
const secondMerge = manager.mergePresets([userTheme, editedPluginTheme]);
assert.equal(secondMerge.added, 3);
assert.equal(secondMerge.themes[1], editedPluginTheme);

const completeMerge = manager.mergePresets(firstMerge.themes);
assert.equal(completeMerge.added, 0);
assert.deepEqual(plain(completeMerge.themes), plain(firstMerge.themes));

const remaining = manager.removePresets(firstMerge.themes);
assert.deepEqual(plain(remaining), [userTheme]);
assert.deepEqual(plain(manager.removePresets(null)), []);

let storedThemes = [userTheme];
const prefs = new Map([
  ["reader.lightTheme", manager.PRESETS[0].id],
  ["reader.darkTheme", "dark"],
]);
const mockZotero = {
  Libraries: { userLibraryID: 1 },
  SyncedSettings: {
    get: (_libraryID, key) =>
      key === manager.SETTINGS_KEY ? storedThemes : undefined,
    set: async (_libraryID, key, value) => {
      assert.equal(key, manager.SETTINGS_KEY);
      storedThemes = value;
    },
    clear: async (_libraryID, key) => {
      assert.equal(key, manager.SETTINGS_KEY);
      storedThemes = [];
    },
  },
  Prefs: {
    get: (key) => prefs.get(key),
    clear: (key) => prefs.delete(key),
  },
};

const installResult = await manager.installIntoZotero(mockZotero);
assert.equal(installResult.added, 4);
assert.equal(storedThemes.length, 5);

const removeResult = await manager.removeFromZotero(mockZotero);
assert.equal(removeResult.removed, 4);
assert.deepEqual(plain(storedThemes), [userTheme]);
assert.equal(prefs.has("reader.lightTheme"), false);
assert.equal(prefs.get("reader.darkTheme"), "dark");

console.log("theme-presets tests passed");

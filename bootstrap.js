/* global APP_SHUTDOWN, ADDON_DOWNGRADE, ADDON_UPGRADE, Zotero, Services */

var eyeCareContext = null;

function getRootURI(data) {
  return data.rootURI || data.resourceURI.spec;
}

function loadThemeManager(data) {
  if (eyeCareContext?.EyeCareThemes) {
    return eyeCareContext.EyeCareThemes;
  }

  eyeCareContext = {};
  Services.scriptloader.loadSubScript(
    `${getRootURI(data)}content/theme-presets.js`,
    eyeCareContext,
  );
  return eyeCareContext.EyeCareThemes;
}

function install() {}

async function startup(data) {
  await Zotero.initializationPromise;

  const manager = loadThemeManager(data);
  const result = await manager.installIntoZotero(Zotero);
  Zotero.debug(
    `[Zotero Eye Care] Ready (${result.added} preset(s) added)`,
  );
}

function onMainWindowLoad() {}

function onMainWindowUnload() {}

async function shutdown(data, reason) {
  if (reason === APP_SHUTDOWN) {
    return;
  }

  // Keep settings in place across an in-app upgrade. The new version will
  // reuse the existing IDs without overwriting user adjustments.
  const isUpgrade =
    (typeof ADDON_UPGRADE !== "undefined" && reason === ADDON_UPGRADE) ||
    (typeof ADDON_DOWNGRADE !== "undefined" && reason === ADDON_DOWNGRADE);

  if (!isUpgrade) {
    const manager = loadThemeManager(data);
    await manager.removeFromZotero(Zotero);
    Zotero.debug("[Zotero Eye Care] Presets removed");
  }

  eyeCareContext = null;
}

async function uninstall(data) {
  // Idempotent fallback for hosts that invoke uninstall without a preceding
  // shutdown callback.
  if (typeof Zotero !== "undefined") {
    const manager = loadThemeManager(data);
    await manager.removeFromZotero(Zotero);
  }
}


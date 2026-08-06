/* Makes the private-sync dialog use Tally Clicker's brat green-and-black interface. */
(() => {
  "use strict";

  const styleMarkers = [".ryan-semantic-sync-open{"];
  const dialogs = ".ryan-semantic-sync-dialog";
  const cards = ".ryan-semantic-sync-card";
  const titles = ".ryan-semantic-sync-card h2";
  const statusPanels = [
    ".ryan-semantic-sync-status", ".ryan-semantic-sync-card section",
  ].join(", ");
  const actionRows = ".ryan-semantic-sync-actions";

  function addClass(selector, className) {
    document.querySelectorAll(selector).forEach((element) => element.classList.add(className));
  }

  function applyTheme() {
    if (document.querySelector('style[data-ryan-semantic-sync-theme="tally-clicker"]')) return;
    document.querySelectorAll("style").forEach((style) => {
      if (styleMarkers.some((marker) => style.textContent.includes(marker))) style.remove();
    });
    addClass(dialogs, "counter-dialog");
    addClass(cards, "dialog-content");
    addClass(titles, "dialog-title");
    addClass(statusPanels, "reset-step");
    addClass(actionRows, "dialog-actions");

    const style = document.createElement("style");
    style.dataset.ryanSemanticSyncTheme = "tally-clicker";
    style.textContent = `
      .ryan-semantic-sync-open{position:fixed!important;left:10px!important;bottom:10px!important;z-index:2147482998!important}
      ${dialogs}{width:min(560px,calc(100% - 24px))!important;max-height:calc(100vh - 24px)!important;margin:auto!important;overflow:auto!important}
      .ryan-semantic-sync-dialog{z-index:2147482999!important}
      .ryan-semantic-sync-card > header{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:10px!important}
      .ryan-semantic-sync-card > header h2{min-width:0!important}
      .ryan-semantic-sync-actions,.ryan-semantic-conflict-actions{gap:10px!important}
      ${statusPanels}{margin-top:0!important;text-align:left!important;line-height:1.15!important}
      .ryan-semantic-sync-card h3{margin-top:0!important;text-transform:lowercase!important}
      .ryan-semantic-conflict{display:grid!important;gap:8px!important;margin-top:8px!important}
      @media(max-width:520px){.ryan-semantic-sync-open{left:6px!important;bottom:6px!important}}
    `;
    document.head.append(style);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyTheme, { once: true });
  else applyTheme();
})();

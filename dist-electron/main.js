import { app as n, BrowserWindow as t } from "electron";
import { createRequire as a } from "node:module";
import { fileURLToPath as l } from "node:url";
import o from "node:path";
a(import.meta.url);
const r = o.dirname(l(import.meta.url));
process.env.APP_ROOT = o.join(r, "..");
const i = process.env.VITE_DEV_SERVER_URL, E = o.join(process.env.APP_ROOT, "dist-electron"), s = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? o.join(process.env.APP_ROOT, "public") : s;
let e;
const p = o.join(process.env.VITE_PUBLIC, "logo.ico");
function c() {
  e = new t({
    // icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    icon: p,
    webPreferences: {
      preload: o.join(r, "preload.mjs")
    },
    minWidth: 1e3,
    minHeight: 550
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? e.loadURL(i) : e.loadFile(o.join(s, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  t.getAllWindows().length === 0 && c();
});
n.whenReady().then(c);
export {
  E as MAIN_DIST,
  s as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};

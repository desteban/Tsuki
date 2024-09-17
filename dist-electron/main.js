import { app as n, BrowserWindow as i } from "electron";
import { createRequire as c } from "node:module";
import { fileURLToPath as p } from "node:url";
import o from "node:path";
c(import.meta.url);
const r = o.dirname(p(import.meta.url));
process.env.APP_ROOT = o.join(r, "..");
const t = process.env.VITE_DEV_SERVER_URL, E = o.join(process.env.APP_ROOT, "dist-electron"), s = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = t ? o.join(process.env.APP_ROOT, "public") : s;
let e;
const l = o.join(process.env.VITE_PUBLIC, "vite.png");
function a() {
  e = new i({
    // icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    icon: l,
    webPreferences: {
      preload: o.join(r, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), t ? e.loadURL(t) : e.loadFile(o.join(s, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  i.getAllWindows().length === 0 && a();
});
n.whenReady().then(a);
export {
  E as MAIN_DIST,
  s as RENDERER_DIST,
  t as VITE_DEV_SERVER_URL
};

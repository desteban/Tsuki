import { app as n, BrowserWindow as s } from "electron";
import { createRequire as a } from "node:module";
import { fileURLToPath as c } from "node:url";
import e from "node:path";
a(import.meta.url);
const t = e.dirname(c(import.meta.url));
process.env.APP_ROOT = e.join(t, "..");
const i = process.env.VITE_DEV_SERVER_URL, _ = e.join(process.env.APP_ROOT, "dist-electron"), r = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? e.join(process.env.APP_ROOT, "public") : r;
let o;
function l() {
  o = new s({
    // icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    icon: e.join(process.env.VITE_PUBLIC, "vite.svg"),
    webPreferences: {
      preload: e.join(t, "preload.mjs")
    }
  }), console.log("Hola", e.join(process.env.VITE_PUBLIC, "vite.svg")), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? o.loadURL(i) : o.loadFile(e.join(r, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), o = null);
});
n.on("activate", () => {
  s.getAllWindows().length === 0 && l();
});
n.whenReady().then(l);
export {
  _ as MAIN_DIST,
  r as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};

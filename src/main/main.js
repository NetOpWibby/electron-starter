"use strict";



//  P A C K A G E S

import electron from "electron";
import path from "path";
import url from "url";

let reloader;

if (process.env.NODE_ENV !== "production") reloader = require("electron-reloader");
// import reloader from "electron-reloader";

//  V A R I A B L E S

// import dockMenu from "./menu/dock";
import isDev from "./isDev";

const {
  app,
  BrowserWindow,
  Menu
} = electron;

const dockMenu = Menu.buildFromTemplate([
  {
    label: "New Window",
    click () { console.log("New Window"); } // eslint-disable-line
  }, {
    label: "New Window with Settings",
    submenu: [
      { label: "Basic" },
      { label: "Pro" }
    ]
  },
  { label: "New Command..." }
]);

const windowStyles = {
  width: 800, height: 600,
  minWidth: 640, minHeight: 395,

  backgroundColor: "#fcfcfc",
  darkTheme: true,
  title: "Electron Starter",
  scrollBounce: true,
  vibrancy: "appearance-based",

  webPreferences: {
    // nodeIntegration: false
    // preload: "./preload.js"
  }
};

let mainWindow;



//  P R O G R A M

if (isSecondInstance) app.quit();
if (process.env.NODE_ENV !== "production") isDev && reloader(module);

// Nothing nefarious is happening, these warnings are annoying.
// I will figure out how to fix these properly later.
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

app.setName("Sample App");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

app.on("activate", () => {
  // Re-create a window in the app when the dock icon
  // is clicked and there are no other windows open
  if (!mainWindow) return createWindow();
});

app.setBadgeCount(0);
app.dock.setMenu(dockMenu);

app.on("will-finish-launching", () => {
  // You would usually set up listeners for the `open-file` and `open-url`
  // events here, and start the crash reporter and auto updater
});

app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") return app.quit();
  return app.quit();
});



//  H E L P E R S

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => { // eslint-disable-line
  if (mainWindow) { // Someone tried to run a second instance, we should focus our window.
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }

  return true;
});

function createWindow() {
  // Create the browser window...
  mainWindow = new BrowserWindow(windowStyles);

  // ...and load the index.html of the app
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "..", "src", "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();

    // Need to figure out how to detect NODE=ENV in Electron
    mainWindow.webContents.openDevTools({ mode: "detach" });
  });

  mainWindow.on("closed", () => mainWindow = null);
}

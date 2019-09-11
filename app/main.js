"use strict";



//  P A C K A G E S

import electron from "electron";
import path from "path";
import url from "url";

//  V A R I A B L E S

import dockMenu from "./lib/menu/dock";
import isDev from "./lib/isDev";

const {
  app,
  BrowserWindow
} = electron;

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => { // eslint-disable-line
  if (mainWindow) { // Someone tried to run a second instance, we should focus our window.
    if (mainWindow.isMinimized())
      mainWindow.restore();

    mainWindow.focus();
  }

  return true;
});

const windowStyles = {
  width: 800,
  height: 600,
  minWidth: 640,
  minHeight: 395,

  backgroundColor: "#fcfcfc",
  center: true,
  show: false,
  title: "Your App Name",
  vibrancy: "appearance-based"
};

let mainWindow;



//  P R O G R A M

if (isSecondInstance)
  app.quit();

// Nothing nefarious is happening, these warnings are annoying.
// I will figure out how to fix these properly later.
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

app.on("activate", () => {
  // Re-create a window in the app when the dock icon
  // is clicked and there are no other windows open
  if (!mainWindow)
    return createWindow();
});

app.on("will-finish-launching", () => {
  // You would usually set up listeners for the `open-file` and `open-url`
  // events here, and start the crash reporter and auto updater
});

app.on("window-all-closed", () => {
  // if (process.platform !== "darwin")
  //   return app.quit();

  return app.quit();
});



//  H E L P E R S

function createWindow() {
  // Create the browser window...
  mainWindow = new BrowserWindow(windowStyles);

  // ...and load the index.html of the app
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "..", "gui", "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  app.dock.setMenu(dockMenu);

  mainWindow.webContents.on("did-finish-load", () => {
    if (isDev)
      mainWindow.webContents.openDevTools({ mode: "detach" });
  });

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => (mainWindow = null));
}

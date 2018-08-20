"use strict";



//  P A C K A G E

import electron from "electron";



//  P R O G R A M

const { ipcRenderer } = electron;

const notif = new window.Notification("Electron Starter", {
  body: "Oh sweet, looks like notifications work!",
  silent: true // set to true for your own app sounds
});

// If notification is clicked, focus app
notif.onclick = () => ipcRenderer.send("focusWindow", "main");

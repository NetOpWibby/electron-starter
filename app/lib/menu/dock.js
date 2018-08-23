"use strict";



//  P A C K A G E

import electron from "electron";

//  V A R I A B L E

const { Menu } = electron;



//  P R O G R A M

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

export default dockMenu;

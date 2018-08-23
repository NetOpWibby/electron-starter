"use strict";



//  P A C K A G E

const choo = require("choo");



//  P R O G R A M

const app = window.yourappname = choo();

if (process.env.NODE_ENV !== "production") {
  app.use(require("choo-devtools")());
}

app.route("#", require("./views/main"));



//  E X P O R T

if (!module.parent) app.mount("body");
else module.exports = exports = app;

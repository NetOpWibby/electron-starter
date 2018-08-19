"use strict";



//  P A C K A G E

const html = require("choo/html");

//  V A R I A B L E

const TITLE = "✨🤩✨ - route not found";



//  P R O G R A M

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE);

  return html`
    <body>
      <h1>404 - route not found</h1>
      <a href="/">Back to main</a>
    </body>
  `;
}



//  E X P O R T

module.exports = exports = view;

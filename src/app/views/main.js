"use strict";



//  P A C K A G E

const html = require("choo/html");

//  V A R I A B L E

const TITLE = "✨🤩✨";



//  P R O G R A M

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE);

  return html`
    <body>
      <h1>✨ <em>s w e e t</em> ✨</h1>
    </body>
  `;
}



//  E X P O R T

module.exports = exports = view;

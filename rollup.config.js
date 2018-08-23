"use strict";



//  P A C K A G E S

import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";



//  E X P O R T

export default [
  { // choo
    external: [
      "choo",
      "choo/html",
      "choo-devtools",
      "nanocomponent"
    ],
    input: "app/gui/index.js",
    output: [{
      file: "app/dist/bundle.js",
      format: "cjs",
      name: "pidge",
      globals: {
        choo: "choo",
        "choo-devtools": "chooDevtools",
        "choo/html": "html"
      }
    }],
    plugins: [
      commonjs(),
      babel({
        exclude: [
          "node_modules/**",
          "app/gui/sass/**"
        ],
      }),
      (process.env.NODE_ENV !== "development" && uglify()) // only minify in production
    ]
  },

  { // electron | main
    external: [
      "electron",
      "electron-reloader",
      "path",
      "url"
    ],
    input: "app/main.js",
    output: [{
      file: "app/dist/main.js",
      format: "cjs"
    }],
    plugins: [
      babel({
        exclude: "node_modules/**",
      }),
      (process.env.NODE_ENV !== "development" && uglify()) // only minify in production
    ]
  },

  { // electron | renderer
    external: [
      "electron"
    ],
    input: "app/lib/renderer.js",
    output: [{
      file: "app/dist/renderer.js",
      format: "cjs"
    }],
    plugins: [
      babel({
        exclude: "node_modules/**",
      }),
      (process.env.NODE_ENV !== "development" && uglify()) // only minify in production
    ]
  }
];



// import resolve from "rollup-plugin-node-resolve";
// import pkg from "./package.json";
// const production = !process.env.ROLLUP_WATCH;

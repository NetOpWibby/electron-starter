"use strict";



//  P A C K A G E S

import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import { uglify } from "rollup-plugin-uglify";



//  E X P O R T

export default [
  { // choo
    external: [
      "choo",
      "choo/html",
      "choo-devtools"
    ],
    input: "src/app/index.js",
    output: [{
      file: "dist/bundle.js",
      format: "cjs",
      name: "theapp",
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
          "src/app/sass/**"
        ],
      }),
      postcss({
        extract: false,
        plugins: [],
        sourceMap: false
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
    input: "src/main/main.js",
    output: [{
      file: "dist/main.js",
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
    input: "src/main/renderer.js",
    output: [{
      file: "dist/renderer.js",
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

#!/usr/bin/env node
const path = require("path");

console.log("npm测试 link");

const babelPathWith = (moduleName) =>
  path.resolve(__dirname, "..", "node_modules", "@babel", moduleName);

console.log("babelPathWith---->", babelPathWith);
require(babelPathWith("register"))({
  plugins: [babelPathWith("plugin-transform-runtime")],
  presets: [babelPathWith("preset-env")],
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],
  ignore: [/luban-cli[\\/]node_modules/],
  cache: false,
});

module.exports = require("./index");

#!/usr/bin/env node
const path = require("path");

console.log("npm测试 link");

const babelPathWith = (moduleName) =>
  path.resolve(__dirname, "..", "node_modules", "@babel", moduleName);

require(babelPathWith("register"))({
  plugins: [babelPathWith("plugin-transform-runtime")],
  presets: [babelPathWith("preset-env")],
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],
  ignore: [/terra-cli[\\/]node_modules/],
  cache: false,
});
module.exports = require("./index");

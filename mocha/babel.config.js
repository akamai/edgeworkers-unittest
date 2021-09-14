'use strict'

const path = require('path');

module.exports = function(api) {
  api.cache(false);

  console.log(`#=#+=asd=as=d=======${module.parent.filename}`)

  const presets = [
    ["@babel/preset-env", {
      "modules": "commonjs"
    }], 
    ["@babel/preset-typescript"]
  ];
  const plugins = [
    ["@babel/plugin-transform-runtime"],
    ["babel-plugin-module-resolver", {
      "root": [
        module.filename,
        "../../../src/edgeworkers/examples",
        "__mocks__"
      ]
    }]
  ]
  return {
    presets,
    plugins
  }
}

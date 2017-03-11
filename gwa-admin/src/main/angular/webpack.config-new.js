const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { AotPlugin } = require('@ngtools/webpack');

module.exports = {
  entry: {
    "main": [
      "./src/main.ts"
    ],
    "polyfills": [
      "./src/polyfills.ts"
    ],
  },
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules"
    ]
  },
  "externals": [
    /^@angular\//,
    /^rxjs\//
  ],
  "output": {
    "libraryTarget": "amd",
    "path": "dist",
    "filename": "[name].bundle.js",
  },
  "module": {
    "rules":[
      {
        "test":/\.ts$/,
        "loader":"@ngtools/webpack"
      },
      {
        "test":/\.html$/,
        "loader":"raw-loader"
      },
      {
        "test":/\.css$/,
        "exclude":[
          "src/styles.css"
        ],
        "loaders":[
           "exports-loader?module.exports.toString()",
           "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
           "postcss-loader"
        ]
     },
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/@angular/),
    new webpack.optimize.UglifyJsPlugin(),
    new ProgressPlugin(),
    new AotPlugin({
      "mainPath":"main.ts",
      "hostReplacementPaths":{
         "environments/environment.ts":"environments/environment.prod.ts"
      },
      "exclude":[
      ],
      "tsConfigPath":"src/tsconfig.app.json"
    }),
  ]
};
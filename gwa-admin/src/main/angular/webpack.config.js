const webpack = require('webpack');
const path = require('path');
const webpackAngularExternals = require('webpack-angular-externals');
const webpackRxjsExternals = require('webpack-rxjs-externals');

const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');

const { NoEmitOnErrorsPlugin, LoaderOptionsPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ["main"];
const baseHref = undefined;
const deployUrl = undefined;

const camelCase = require('lodash.camelcase');

module.exports = {
  "devtool": "source-map",
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
  "entry": {
    "main": [
      "./src/main.ts"
    ],
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "libraryTarget": "umd"
  },
  "externals": {
    '@angular/common': '@angular/common',
    '@angular/compiler': '@angular/compiler',
    '@angular/core': '@angular/core',
    '@angular/flex-layout': '@angular/flex-layout',
    '@angular/forms': '@angular/forms',
    '@angular/http': '@angular/http',
    '@angular/material': '@angular/material',
    '@angular/platform-browser': '@angular/platform-browser',
    '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic',
    '@angular/router': '@angular/router',
    'core-js': 'core-js',
    'core-js/es6': 'core-js/es6',
    'core-js/es7/reflect': 'core-js/es7/reflect',
    'rxjs': 'rxjs',
    'rxjs/add/operator/map': 'rxjs/add/operator/map',
    'rxjs/add/operator/switchMap': 'rxjs/add/operator/switchMap',
    'rxjs/add/operator/toPromise': 'rxjs/add/operator/toPromise',
    'rxjs/Rx': 'rxjs/Rx',
    'rxjs/Observable': 'rxjs/Observable',
    'rxjs/Subscription': 'rxjs/Subscription',
    'zone.js/dist/zone': 'zone.js/dist/zone',
    '@swimlane/ngx-datatable': '@swimlane/ngx-datatable',
    'shim': 'shim'
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.js$/,
        "loader": "source-map-loader",
        "exclude": [
          /\/node_modules\//
        ]
      },
      {
        "test": /\.json$/,
        "loader": "json-loader"
      },
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg)$/,
        "loader": "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.css$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.less$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.styl$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader",
          "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.css$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
    "postcss-loader"
  ],
  "fallback": "style-loader",
  "publicPath": ""
})
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
    "postcss-loader",
    "sass-loader"
  ],
  "fallback": "style-loader",
  "publicPath": ""
})
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.less$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
    "postcss-loader",
    "less-loader"
  ],
  "fallback": "style-loader",
  "publicPath": ""
})
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.styl$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
    "postcss-loader",
    "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
  ],
  "fallback": "style-loader",
  "publicPath": ""
})
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new GlobCopyWebpackPlugin({
      "patterns": [
        "assets",
        "favicon.ico"
      ],
      "globOptions": {
        "cwd": "/Users/paustin/Development/ALL/ca.bc.gov.gwa/gwa-admin/src/main/angular/src",
        "dot": true,
        "ignore": "**/.gitkeep"
      }
    }),
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src/index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new ExtractTextPlugin({
      "filename": "[name].bundle.css",
      "disable": true
    }),
    new LoaderOptionsPlugin({
      "sourceMap": false,
      "options": {
        "postcss": [
          autoprefixer(),
          postcssUrl({"url": (URL) => {
            // Only convert absolute URLs, which CSS-Loader won't process into require().
            if (!URL.startsWith('/')) {
                return URL;
            }
            // Join together base-href, deploy-url and the original URL.
            // Also dedupe multiple slashes into single ones.
            return `/${baseHref || ''}/${deployUrl || ''}/${URL}`.replace(/\/\/+/g, '/');
        }})
        ],
        "sassLoader": {
          "sourceMap": false,
          "includePaths": []
        },
        "lessLoader": {
          "sourceMap": false
        },
        "context": ""
      }
    }),
    new AotPlugin({
      "mainPath": "main.ts",
      "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment.ts"
      },
      "exclude": [],
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  }
};

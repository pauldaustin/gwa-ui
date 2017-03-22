(function (global) {
  System.config({
    paths: {
      'npm:': 'https://unpkg.com/'
    },
    map: {
      app: 'app',

      '@angular/core': 'npm:@angular/core@2.4.10/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common@2.4.10/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler@2.4.10/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser@2.4.10/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@2.4.10/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http@2.4.10/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router@3.4.10/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms@2.4.10/bundles/forms.umd.js',
      '@angular/flex-layout': 'npm:@angular/flex-layout@2.0.0-rc.1/bundles/flex-layout.umd.js',
      '@angular/material': 'npm:@angular/material@2.0.0-beta.2/bundles/material.umd.js',
      '@swimlane/ngx-datatable': 'npm:@swimlane/ngx-datatable@6.3.0/release/index.min.js',
      'rxjs': 'npm:rxjs@5.0.1',
    },
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
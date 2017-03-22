(function (global) {
  SystemJS.config({
    paths: {
      'npm:': 'https://unpkg.com/'
    },
    map: {
      app: 'app',
      '@angular/core': 'npm:@angular/core@2.4.10/bundles/core.umd.min.js',
      '@angular/common': 'npm:@angular/common@2.4.10/bundles/common.umd.min.js',
      '@angular/compiler': 'npm:@angular/compiler@2.4.10/bundles/compiler.umd.min.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser@2.4.10/bundles/platform-browser.umd.min.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@2.4.10/bundles/platform-browser-dynamic.umd.min.js',
      '@angular/http': 'npm:@angular/http@2.4.10/bundles/http.umd.min.js',
      '@angular/router': 'npm:@angular/router@3.4.10/bundles/router.umd.min.js',
      '@angular/forms': 'npm:@angular/forms@2.4.10/bundles/forms.umd.min.js',
      '@angular/flex-layout': 'npm:@angular/flex-layout@2.0.0-rc.1/bundles/flex-layout.umd.js',
      '@angular/material': 'npm:@angular/material@2.0.0-beta.2/bundles/material.umd.js',
      '@swimlane/ngx-datatable': 'npm:@swimlane/ngx-datatable@6.3.0/release/index.min.js',
      'rxjs': 'npm:rxjs@5.0.1',
    },
    packages: {
      app: {
        main: './main.bundle.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
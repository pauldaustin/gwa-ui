(function (global) {
  SystemJS.config({
    paths: {
      'npm:': 'https://unpkg.com/'
    },
    map: {
      app: 'app',
      '@angular/animations': 'npm:@angular/animations@4.0.0/bundles/animations.umd.min.js',
      '@angular/animations/browser': 'npm:@angular/animations@4.0.0/bundles/animations-browser.umd.min.js',
      '@angular/core': 'npm:@angular/core@4.0.0/bundles/core.umd.min.js',
      '@angular/common': 'npm:@angular/common@4.0.0/bundles/common.umd.min.js',
      '@angular/compiler': 'npm:@angular/compiler@4.0.0/bundles/compiler.umd.min.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser@4.0.0/bundles/platform-browser.umd.min.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser@4.0.0/bundles/platform-browser-animations.umd.min.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@4.0.0/bundles/platform-browser-dynamic.umd.min.js',
      '@angular/http': 'npm:@angular/http@4.0.0/bundles/http.umd.min.js',
      '@angular/router': 'npm:@angular/router@4.0.0/bundles/router.umd.min.js',
      '@angular/forms': 'npm:@angular/forms@4.0.0/bundles/forms.umd.min.js',
      '@angular/flex-layout': 'npm:@angular/flex-layout@2.0.0-rc.1/bundles/flex-layout.umd.js',
      '@angular/material': 'npm:@angular/material@2.0.0-beta.2/bundles/material.umd.js',
      '@swimlane/ngx-datatable': 'npm:@swimlane/ngx-datatable@7.1.1/release/index.min.js',
      'rxjs': 'npm:rxjs@5.2.0',
    },
    packages: {
      app: {
        main: '../js/main.bundle.js',
        defaultExtension: 'js',
        meta: {
          scriptLoad: true,
          format: 'amd',
          exports: 'app',
          authorizae: true
        }
      },
      rxjs: {
        defaultExtension: 'js'
      }
    },
  });
})(this);
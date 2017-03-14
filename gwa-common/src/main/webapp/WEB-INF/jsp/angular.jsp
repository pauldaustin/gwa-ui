<%@ page
  contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"
  session="false"
%><%@
  taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"
%><c:set var="request" value="${pageContext.request}" />
<!DOCTYPE html>
<html>
  <head>
    <base href="${request.contextPath}/" />
    <title>Application</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
   
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="css/styles.bundle.css" rel="stylesheet"/></head>
    <style type="text/css">
@import 'css/deeppurple-amber.css';
@import 'css/ngx-datatable/index.css';
@import 'css/ngx-datatable/themes/material.css';
@import 'css/ngx-datatable/assets/icons.css';

@font-face {
  font-family: 'Myriad-Web-Pro';
  src: url('fonts/MyriadWebPro.ttf');
}
    </style>
  </head>

  <body>
    <bcgov-template>
    </bcgov-template>
    <script src="https://unpkg.com/core-js/client/shim.min.js"></script>
       
    <script type="text/javascript" src="https://unpkg.com/rxjs@5.2.0/bundles/Rx.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/core@2.4.8/bundles/core.umd.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/common@2.4.8/bundles/common.umd.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/compiler@2.4.8/bundles/compiler.umd.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/forms@2.4.8/bundles/forms.umd.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/platform-browser@2.4.8/bundles/platform-browser.umd.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/platform-browser-dynamic@2.4.8/bundles/platform-browser-dynamic.umd.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/http@2.4.8/bundles/http.umd.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/router@3.4.8/bundles/router.umd.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/flex-layout@2.0.0-rc.1/bundles/flex-layout.umd.js"></script>
    <script type="text/javascript" src="https://unpkg.com/hammerjs@2.0.8/hammer.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@angular/material@2.0.0-beta.2/bundles/material.umd.js"></script>
    <!-- script type="text/javascript" src="https://unpkg.com/@swimlane/ngx-datatable@6.3.0/release/index.min.js"></script> -->
       
    <script type="text/javascript" src="js/inline.bundle.js"></script>
    <script type="text/javascript" src="js/polyfills.bundle.js"></script>
    <script type="text/javascript" src="js/styles.bundle.js"></script>
 
    <script type="text/javascript" src="js/vendor.bundle.js"></script>
 
    <script type="text/javascript" src="js/main.bundle.js"></script>
  </body>
</html>

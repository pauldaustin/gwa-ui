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
    <style type="text/css">
@import 'styles.css';
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
    <script src="https://unpkg.com/zone.js@0.7.4?main=browser"></script>
    <script src="https://unpkg.com/systemjs@0.19.39/dist/system.src.js"></script>
    <script src="systemjs.config.server.js"></script>
    <script>
    System.import('main.js')
    .catch(function(err){ console.error(err); });
    </script>
    
  </body>
</html>

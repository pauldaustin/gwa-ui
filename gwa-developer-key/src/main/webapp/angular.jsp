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
    <title>Gateway Developer Keys</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://code.jquery.com/ui/1.11.2/themes/cupertino/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css" rel="stylesheet" type="text/css">

    <link href="css/styles.css" rel="stylesheet" type="text/css">
   
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
    <script type="text/javascript" src="js/rs.js"></script>


    <script src="js/shim.min.js"></script>
    <script src="js/zone.min.js"></script>
    <script>window.module = 'aot';</script>
  </head>

  <body>
    <bcgov-template>
    </bcgov-template>
  </body>
  <script src="aot/dist/build.js"></script>
</html>
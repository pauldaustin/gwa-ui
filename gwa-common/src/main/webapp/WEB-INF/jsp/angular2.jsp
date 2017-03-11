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

    <link href="https://code.jquery.com/ui/1.11.2/themes/cupertino/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css" rel="stylesheet" type="text/css">

    <link href="css/styles.css" rel="stylesheet" type="text/css">
   
    <link href="css/styles.bundle.css" rel="stylesheet"/></head>
  </head>

  <body>
    <bcgov-template>
    </bcgov-template>

  <script src="https://npmcdn.com/core-js/client/shim.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/reflect-metadata/0.1.3/Reflect.min.js"></script>

<script>
var require = (function(){
    var versions = {
        'router': '@@3.4.8',
        'angular': '@@2.4.8',
        'rxjs': '@@5.1.1'
    }

    var paths = {
        'rxjs': "https://npmcdn.com/rxjs" + versions.rxjs + "/bundles/Rx.umd.min"
    };
    [
        'core',
        'http',
        'common',
        'compiler',
        'forms',
        'platform-browser',
        'router',
        'platform-browser-dynamic'
    ].forEach(function (submodule) {
        var module = '@@angular/' + submodule
        paths[module] = 'https://npmcdn.com/' + module + (versions[submodule] || versions.angular) + '/bundles/' + submodule + '.umd.min';
    });

    var rxmap = {};
    [
        'Rx',
        'Observable',
        'Subject',
        'observable/PromiseObservable',
        'operator/toPromise'
    ].forEach(function (submodule) {
        rxmap['rxjs/' + submodule] = 'rxjs';
    })

    return {
        paths: paths,
        map: {
            '*': rxmap
        }
    };
})();
    </script>
    <script data-main="js/main.bundle.js" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js"></script>

    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
    <script type="text/javascript" src="js/rs.js"></script>
<!--    <script type="text/javascript" src="js/inline.bundle.js"></script>
    <script type="text/javascript" src="js/polyfills.bundle.js"></script>
    <script type="text/javascript" src="js/vendor.bundle.js"></script>
    <script type="text/javascript" src="js/main.bundle.js"></script>
  -->  </body>
</html>

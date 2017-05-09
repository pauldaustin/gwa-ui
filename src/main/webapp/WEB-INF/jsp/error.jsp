<%@ page 
  contentType="text/html; charset=UTF-8"
  session="false"
  pageEncoding="UTF-8"
%><%@
  taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"
%><c:set var="request" value="${pageContext.request}" />
<!DOCTYPE html>
<html xml:lang="en">
  <head>
    <base href="${request.contextPath}/" />

    <title><c:out value="${requestScope['javax.servlet.error.status_code']}" /> Error</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/rs.css" rel="stylesheet" type="text/css">
    <link href="css/styles.css" rel="stylesheet" type="text/css">

    <style>
body {
  height: 100%;
}

.bcgov-template {
  font-family: 'Myriad-Web-Pro',Calibri,Arial,sans serif;
}

.bcgov-header .navbar-header {
  background-color: #003366;
  border-bottom: 2px solid #fcba19;
  height: 70px;
  width: 100%;
  padding-bottom: 10px;
}

.bcgov-header .navbar-header .navbar-brand {
  font-size: 35px;
  color: #ffffff;
  padding: 0px;
}

.bcgov-header .navbar-header h1.navbar-brand-title {
  margin: 20px 0px 0px 15px;
  margin-top: 20px;
  font-size: 35px;
  color: #ffffff;
  display: block;
  float:right;
}

.bcgov-content {
  padding-top: 120px;
  min-height: 100vh;
  padding-bottom: 52px;
}

@media (max-width: 767px) {
  .bcgov-content {
    padding-top: 60px;
  }
}

.bcgov-footer {
  font-size: 13px;
  z-index: 1040;
  position: relative;
}

.bcgov-footer nav {
  background-color: #003366;
  border-top: 2px solid #fcba19;
  min-height: 42px;
  width: 100%;
  line-height: 18px;
  border-radius: 0px;
  margin-bottom: 0px;
  position: absolute;
  bottom: 0px;
}

.bcgov-footer nav ul {
  padding: 10px 0;
}

.bcgov-footer nav li {
  border-left: 1px solid #4b5e73;
  padding: 2px 10px;
}

.bcgov-footer nav li:first-child {
  border-left-width: 0px;
}

.bcgov-footer nav li a {
  color: #ffffff;
  padding: 0px;
}

.bcgov-footer nav li a:active,
.bcgov-footer nav li a:hover,
.bcgov-footer nav li a:visited {
  text-decoration: underline;
}

.bcgov-header .navbar-toggle {
  border-width: 0px;
  border-radius: 0px;
  padding: 4px;
  margin: 16px 6px 17px 6px;
}

.bcgov-footer .navbar-toggle {
  border-width: 0px;
  border-radius: 0px;
  padding: 4px;
  margin: 6px 6px 7px 6px;
}

.bcgov-header .navbar-toggle .icon-bar,
.bcgov-footer .navbar-toggle .icon-bar {
  background-color: #c6d6ee;
  height: 5px;
  width: 34px;
  radius: 0px;
  border-radius: 0px;
  border-width: 0px;
}

.bcgov-header .navbar-toggle:hover,
.bcgov-footer .navbar-toggle:hover {
  border-width: 0px;
  background-color: #c6d6ee;
}

.bcgov-header .navbar-toggle:hover .icon-bar,
.bcgov-footer .navbar-toggle:hover .icon-bar {
  background-color: #003366;
}

.navbar-default {
  background-color: #003366;
}
.navbar-default .navbar-brand {
  color: white;
}
.navbar-default .navbar-brand a {
  color: white;
  text-decoration: none;
}

.navbar-default .navbar-brand:focus,
.navbar-default .navbar-brand:hover {
    color: #eeeeee;
}

.navbar-default .navbar-brand {
  padding: 0px 0px 0px 5px;
  height: 100%;
  line-height: normal;
}

.navbar-default .navbar-brand > a {
  padding-right: 5px;
  display: inline-block;
  vertical-align: middle;
}

.navbar-default .navbar-brand .navbar-brand-title {
  font-size: 28px;
}

.navbar-default .navbar-nav>li>a {
  color: white;
}

.navbar-default .navbar-nav > li > a:focus,
.navbar-default .navbar-nav > li > a:hover {
  color: #dddddd;
}

.navbar-default .navbar-toggle .icon-bar {
  background-color: white;
}
.navbar-default .navbar-toggle:hover .icon-bar,
.navbar-default .navbar-toggle:focus .icon-bar {
  background-color: #888;
}
    </style>
  </head>
  <body>
<div class="bcgov-template">
  <header class="bcgov-header header">
    <nav id="adminMainMenu" class="navbar navbar-default navbar-fixed-top">
      <div class="navbar-header">
        <div class="container">
          <div class="navbar-brand">
            <a href="http://www2.gov.bc.ca/">
              <img src="images/gov3_bc_logo.png" class="hidden-xs" />
              <img src="images/gov3_bc_logo_mobile.png" class="visible-xs-inline-block" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="bcgov-content container">
    <div class="panel panel-danger">
      <div class="panel-heading">
        <h3 class="panel-title"><c:out value="${requestScope['javax.servlet.error.status_code']}" /> Error</h3>
      </div>
      <div class="panel-body">
<c:if test="${not empty param['subTitle']}">
        <h4><c:out value="${param['subTitle']}" /></h4>
</c:if>
<c:if test="${not empty requestScope['javax.servlet.error.message']}">
        <pre><c:out value="${requestScope['javax.servlet.error.message']}" escapeXml="false" /></pre>
</c:if>
        <button type="button" onclick="history.go(-1)" class="btn btn-primary btn-sm"><span class="fa fa-chevron-left" aria-hidden="true"></span> Back</button>
      </div>
    </div>
  </div>
  <footer class="bcgov-footer footer">
    <nav id="bcgovFooterMenu" class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
  
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bcgovFooterMenuBar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar" aria-hidden="true"></span>
            <span class="icon-bar" aria-hidden="true"></span>
            <span class="icon-bar" aria-hidden="true"></span>
          </button>
        </div>
  
        <div id="bcgovFooterMenuBar" class="navbar-collapse collapse" aria-expanded="false">
          <ul class="nav navbar-nav navbar-left">
            <li><a href="http://www2.gov.bc.ca/gov/content/home" title="About gov.bc.ca">Home</a></li>
            <li><a href="http://www2.gov.bc.ca/gov/content/home/disclaimer" title="Disclaimer">Disclaimer</a></li>
            <li><a href="http://www2.gov.bc.ca/gov/content/home/privacy" title="Privacy">Privacy</a></li>
            <li><a href="http://www2.gov.bc.ca/gov/content/home/accessibility" title="Accessibility">Accessibility</a></li>
            <li><a href="http://www2.gov.bc.ca/gov/content/home/copyright" title="Copyright">Copyright</a></li>
            <li><a href="https://extranet.gov.bc.ca/forms/gov/contact/index.html" title="Contact Us">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </footer>
</div>
  </body>
</html>

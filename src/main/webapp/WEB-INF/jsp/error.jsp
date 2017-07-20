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

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/styles.css" rel="stylesheet" type="text/css">

    <style>
body {
  height: 100%;
  margin: 0px;
}
@font-face {
  font-family: 'Myriad-Pro';
  src: url('../fonts/MyriadWebPro.ttf');
}

.bcgov-template {
  font-family: Myriad-Pro, Calibri, Arial, 'sans serif';
  display:flex;
  flex-direction:column;
  min-height: 100vh;
}
.collapse {
  display: none;
}

header {
  margin-bottom: 10px;
  box-shadow: 0 3px 3px 1px rgba(51, 51, 51, .5);
}

.header-title {
  flex: 1 1 auto;
  align-self: stretch;
  margin: auto 0px auto 0px;
}
.header-title a {
  text-decoration: none;
}
.header-title a h1 {
  color: white;
  margin: 0px;
  font-size: 35px;
}

.logo {
  margin-right: 10px;
}
.logo-large {
  display: none;
}

.bcgov-content {
  flex: 1;
  display: flex;
  flex-direction:column;
  margin: 0px;
}

footer {
  font-size: 14px;
  margin-top: 10px;
  border-top: 2px solid #fcba19;
}

footer .menu {
  background-color: #003366;
}

.titlebar {
  background-color: #003366;
  padding: 10px;
  display:flex;
  flex-direction:row;
  align-items: flex-start;
}

header .titlebar {
  border-bottom: 2px solid #fcba19;
}

.menu-button {
  display: block;
  border-width: 0px;
  border-radius: 0px;
  padding: 4px;
  margin: auto 0px auto 10px;
  background-color: #003366;
  color: #c6d6ee;
  font-size: 30px;
  width: 38px;
  height: 38px;
}

.menu-button:hover,
.menu-button:hover {
  border-width: 0px;
  background-color: #c6d6ee;
  color: #003366;
}
.menu-button:focus {
  outline: 0;
}

.menu {
  background-color: #38598a;
  color: #ffffff;
}

.menu .menu-sections {
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  padding: 10px 30px 0px 30px;
}

.menu ul {
  list-style: none;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 0px;
  padding: 0px;
}
.menu li {
  display:inline;
  border-left: 1px solid #748bad;
  border-top-width: 0px;
  padding: 0px 10px 0px 10px;
  margin-bottom: 10px;
}
.menu li > a {
  color: #ffffff;
}

.menu li > a.active-link {
  color: #fcba19;
  font-weight: bold;
  text-decoration: underline;
}

.menu .mat-icon {
  height: 20px;
  margin-top: -4px;
}

.fill-width {
  flex-grow: 1;
  height: 0px;  
}

footer .menu-button {
  margin-left: auto;
  display: block;
}

@media ( min-width : 769px) {
  .bcgov-content {
    margin: 0px 5%;
  }
  .logo-small {
    display: none;
  }
  .logo-large {
    display: inline;
  }
  .menu-button {
    display: none;
  }
  .titlebar {
    padding: 10px 20px 10px 20px;
  }
  
  footer .titlebar {
    display: none;
  }

  .menu ul > li {
    border-left: 1px solid #748bad;
    border-top-width: 0px;
    padding: 0px 10px 0px 10px;
    width:auto;
    margin-bottom: 10px;
  }
  .menu ul>li:first-child {
    border-left-width: 0px;
  }
  .menu-right {
  }
}
button.back {
  background-color: #f44336;
  color: white;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  transform: translate3d(0,0,0);
  transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);
  box-sizing: border-box;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  border: none;
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
  white-space: nowrap;
  text-decoration: none;
  vertical-align: baseline;
  text-align: center;
  margin: 0;
  min-width: 88px;
  line-height: 36px;
  padding: 0 16px;
  border-radius: 2px;
  font-family: Roboto,"Helvetica Neue",sans-serif;
  font-size: 14px;
  font-weight: 500;
}
.email {
  margin:10px;
  padding: 10px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
    </style>
  </head>
  <body>
    <div class="bcgov-template">
      <header>
        <nav>
          <div class="titlebar">
            <div class="logo">
              <a href="http://www2.gov.bc.ca/">
                <img src="/images/gov3_bc_logo.png" class="logo-large" />
                <img src="/images/gov3_bc_logo_mobile.png" class="logo-small" />
              </a> 
            </div>
    
            <div class="header-title">
              <a routerLink="/"><h1>Gateway</h1></a>
            </div>
          </div>
        </nav>
      </header>


      <div class="bcgov-content">
        <div style="margin-top:10px;padding: 10px;box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);">
          <h1 style="color:#f44336"><c:out value="${requestScope['javax.servlet.error.status_code']}" /> Error</h1>
<c:choose>
  <c:when test="${requestScope['javax.servlet.error.status_code'] == 403}">
    <c:choose>
      <c:when test="${requestScope['javax.servlet.forward.request_uri'].startsWith('/int')}">
<c:set var="gwaMailSubject" value="[GWA] Gateway Admin Grant API Owner" />
<c:set var="gwaMailBody" value="Please grant my account IDIR account [YOUR ACCOUNT GOES HERE] the ROLE_GWA_API_OWNER role using the Gateway Admin (GWA) application." />
<c:url value="mailto:data@gov.bc.ca?subject=${gwaMailSubject}&body=${gwaMailBody}" var="gwaMailUrl" />
<p>You do not have permission to access the Gateway Admin (GWA) application.</p>

<p>If you are an API owner send the following email requesting access the Gateway Admin application. Replace [YOUR ACCOUNT GOES HERE] with your IDIR account. The To: link below should automatically create an email with the subject and body.</p>
<div class="email">
  <b>To:</b> <a href="${gwaMailUrl}">data@gov.bc.ca</a> <br />
  <b>Subject:</b> <c:out value="${gwaMailSubject}" /> <br />
  <b>Body:</b> <c:out value="${gwaMailBody}" />
</div>
      </c:when>
      <c:otherwise>
      <p>Dev key error</p>
      </c:otherwise>
    </c:choose>
  </c:when>
  <c:otherwise>
    <c:if test="${not empty param['subTitle']}">
              <p><c:out value="${param['subTitle']}" /></p>
    </c:if>
    <c:if test="${not empty requestScope['javax.servlet.error.message']}">
             <pre><c:out value="${requestScope['javax.servlet.error.message']}" escapeXml="false" /></pre>
    </c:if>
  </c:otherwise>
</c:choose>
          <button class="back" onclick="history.go(-1)">
            <span class="fa fa-chevron-left" aria-hidden="true"></span> Back
          </button>
        </div>
      </div>
    
      <footer>
        <nav>
          <div class="menu">
            <div class="menu-sections">
              <ul>
                <li><a href="http://www2.gov.bc.ca/gov/content/home" title="About gov.bc.ca">Home</a></li>
                <li><a href="http://www2.gov.bc.ca/gov/content/home/disclaimer" title="Disclaimer">Disclaimer</a></li>
                <li><a href="http://www2.gov.bc.ca/gov/content/home/privacy" title="Privacy">Privacy</a></li>
                <li><a href="http://www2.gov.bc.ca/gov/content/home/accessibility"
                  title="Accessibility">Accessibility</a></li>
                <li><a href="http://www2.gov.bc.ca/gov/content/home/copyright" title="Copyright">Copyright</a></li>
                <li><a href="https://extranet.gov.bc.ca/forms/gov/contact/index.html"
                  title="Contact Us">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </footer>
    </div>
  </body>
</html>

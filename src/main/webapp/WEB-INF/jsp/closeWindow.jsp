<html>
  <head>
  <script type="text/javascript">
  var messageWindow = window.opener;
  if (!messageWindow) {
    messageWindow = window.parent;
  }
  messageWindow.postMessage('close','*');
</script>
  </head>
  <body>
  </body>
</html>
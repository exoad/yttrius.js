var http = require('http');

http.createServer(function (req, res) {
  res.write("YttriusMain is online");
  res.end();
}).listen(3030);
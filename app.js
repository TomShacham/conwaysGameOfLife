var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000);
var WebSocketServer = require('ws').Server;


var webSocketServer = new WebSocketServer({ server: server });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

function log(req, res, next) {
 console.log('[%s] %s %s', new Date(), req.method, req.url);
 next();
}

app.use(log);

function Board(){
  this.width = 14;
  this.height = this.width;
}

app.get('/', function(req, res, send){
  var board = new Board;
  res.render('board/index', { board: board });
});

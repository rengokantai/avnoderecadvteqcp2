var http = require('http'),
fs = require('fs'),
url = require('url'),
wss = require('websocket').server;


var server = http.createServer(function(req,res){
	var urlParsed = url.parse(req.url,true,true);

	fs.readFile(urlParsed.path.split('/')[1],function(err,data){
		if(err){
			res.statusCode(404);
			res.end(http.STATUS_CODES[404])
		}
	});

}).listen(3000);

var serverConfig = {
	httpServer:server,
	autoAcceptConnections: false
}

var wsserver = new wss();

wsserver.mount(serverConfig);
wsserver.on('connect',function(conn){
	conn.send('k');
})

wsserver.on('request',function(req){
	var connection = req.accept('echo-protocol',req.origin);
	connection.on('message',function(msg){
		if(msg.type==='utf8') {
			console.log(msg.utf8Data);
		}else if(msg.type==='binary') {
			console.log(msg.binaryData);
		}
	});

	connection.on('close',function(reasonCode,desc){
		console.log('closed',reasonCode,desc)
	});
});
wsserver.on('close',function(conn,reason,desc){
	console.log('closing',reason,desc);
})
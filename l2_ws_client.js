var wsc = require('websocket').client;

var wsclient =new wsc();


wsclient.on('connect',function(conn){
	console.log('connection successful');
	conn.on('error',function(err){
		console.log('connection error');
	})
	conn.on('close',function(err){
		console.log('connection closed');
	})
	conn.on('message',function(msg){
		switch(msg.type){
			case 'utf8':
				console.log('from server: '+ msg.utf8Data);
				break;
			default:
				console.log(JSON.stringify(msg));
				break;
		}
	})
	conn.send('k');
})

wsclient.connect('ws://localhost:3000','echo-protocol');

wsclient.on('connectFailed',function(err){
	console.log('Error '+err.toString())
})


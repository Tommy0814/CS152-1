var net = require('net');
var eol = require('os').EOL;

var srvr = net.createServer();
var clientList = [];

var listCmd = "\\list";
var renameCmd = "\\rename";
var privateCmd = "\\private";

srvr.on('connection', function(client) {
  client.name = client.remoteAddress + ':' + client.remotePort;
  client.write('Welcome, ' + client.name + eol);
  clientList.push(client);

  client.on('data', function(data) {
    process(data, client);
  });
});

function process(data, client) {
	data += '';
	if (data == eol) return; //dont allow blank msgs
	
	var cleanData = data;
	if (cleanData.indexOf(eol) !== -1) //accidental eol cleanup
		cleanData = cleanData.substring(0, cleanData.indexOf(eol));
	
	var fields = ('' + cleanData).split(' ');
	if (fields.length > 0) {
		switch (fields[0]) {
			case listCmd:
				client.write("Currently Online: ");
				for (let i of clientList)
					if (i !== client) client.write(i.name + " ");
				client.write(eol);
				break;
			case renameCmd:
				if (fields.length > 1) {
					var cleanName = fields[1] + ''; 
					if (cleanName.indexOf(eol) !== -1) //accidental eol cleanup
						cleanName = cleanName.substring(0, cleanName.indexOf(eol));
					client.name = cleanName;
					client.write("Renamed to: " + cleanName + eol);
				} else
					client.write("Error: No Name Provided" + eol)
				break;
			case privateCmd:
				if (fields.length > 2){
					for (let i of clientList)
						if (i.name == fields[1])
							i.write(client.name + " whispers " + cleanData.substring(cleanData.indexOf(fields[2])) + eol);
				} else
					client.write("Error: No Message" + eol);
				break;
			default:
				broadcast(cleanData + eol, client);
				break;
		}
	}
}

function broadcast(data, client) {
  for (var i in clientList) {
    if (client !== clientList[i]) {
      clientList[i].write(client.name + " says " + data);
    }
  }
}

srvr.listen(9000);



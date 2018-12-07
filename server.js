'use strict';
const WebSocketServer = require('ws').Server;
const Crypto = require('crypto-js');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "localhost";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const wss = new WebSocketServer({ port: port });

console.log("Starting server on: " + ipaddress.toString() + ":" + port.toString());

const maxPeople = 330;
const minPeople = 0;
let people = 0;

let lastRecorded = 0;
function parseInput(number) {
    if (isNaN(number)) number = lastRecorded;
    else lastRecorded = number;
    return Math.min(Math.max(number, minPeople), maxPeople);
}

wss.broadcast = function broadcastMsg(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg.toString());
    });
};

setInterval(function() {
    wss.broadcast('ping');
}, 5000);

wss.on('connection', ((client) => {
	let verifiedUser = false;
	let total = 0;
	client.on('message', (message) => {
	  	const messageContent = message.split(',');
	  	const command = messageContent[0];
        console.log(`received: ${message}`);
	  	switch(command) {
		    case 'set':
		    	if (verifiedUser) {
                    people = parseInput(messageContent[1]);
                    console.log(people);
                    total = 0;
                    wss.broadcast(['set', people]);
                }
                else {
                    console.log("No verified user");
                }
                break;
            case 'add':
                if (verifiedUser) {
                    people = parseInput(people + parseInt(messageContent[1]) - total);
                    total = messageContent[1];
                    console.log(people);
                    wss.broadcast(['set', people]);
                }
                else {
                    console.log("No verified user");
                }
                break;
			case 'reqSet':
                total = 0;
                client.send(['set', people].toString());
                break;
			case 'verify':
                let string = messageContent[1];
                let clientTotal = messageContent[2];
                if ('0c03df324cb0926092cfec9b94c1c2c0a50799e00a89187807f84cc09de418f1' === Crypto.SHA256(string).toString()) {
                    verifiedUser = true;
                    client.send("verified");
                }
                else {
                    client.send('unverified');
                }
                break;
            case 'ping':
                break;
		}
	});

	client.on('end', () => {
		console.log('Connection ended...');
	});

	client.onerror = function (err) {
	  console.log('err: ', err);
	};

	client.send(['set', people].toString());
    console.log('Client succesfully connected');
}));

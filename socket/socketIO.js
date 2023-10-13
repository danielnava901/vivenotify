const {http} = require('../server');
const io = require('socket.io')(http);
const redis = require('redis');
const client = redis.createClient();

io.on('connection', (socket) => {
    console.log('Cliente de WebSocket conectado');


    client.connect().then(async () => {
        console.log("cliente 2 conectado..");
        await client.subscribe('report_completed', (message) => {
            console.log("en socketIO message", message);
            socket.emit("report_completed", message);
        });
    });
});


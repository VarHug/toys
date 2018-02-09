// import { Socket } from 'net';

var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

//客户端计数
var clientCount = 0;

//用来存储客户端socket
var socketMap = {};

app.listen(PORT);

//客户端连接
io.on('connection', function (socket) {
    clientCount++;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    if (clientCount & 1) {
        socket.emit('waiting', 'waiting for another person');
    } else {
        socket.emit('start');
        socketMap[(clientCount - 1)].emit('start');
    }
    
    socket.on('init', function (data) {
        if (socket.clientNum % 2 === 0) {
            socketMap[socket.clientNum - 1].emit('init', data); 
        } else {
            socketMap[socket.clientNum + 1].emit('init', data);
        }
    });

    //客户端断开
    socket.on('disconnect', function () {
        
    });
});

console.log('websocket listening on port' + PORT);
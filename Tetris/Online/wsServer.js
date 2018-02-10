// import { Socket } from 'net';

var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

//客户端计数
var clientCount = 0;

//用来存储客户端socket
var socketMap = {};

app.listen(PORT);

var bindListener = function (socket, event) {
    socket.on(event, function (data) {
        if (socket.clientNum % 2 === 0) {
            socketMap[socket.clientNum - 1].emit(event, data); 
        } else {
            socketMap[socket.clientNum + 1].emit(event, data);
        }
    });
};

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
    
    bindListener(socket, 'init');
    bindListener(socket, 'next');
    bindListener(socket, 'rotate');
    bindListener(socket, 'right');
    bindListener(socket, 'left');
    bindListener(socket, 'down');
    bindListener(socket, 'fall');
    bindListener(socket, 'fixed');
    bindListener(socket, 'line');

    //客户端断开
    socket.on('disconnect', function () {
        
    });
});

console.log('websocket listening on port' + PORT);
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
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit(event, data);   
            }
             
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit(event, data); 
            }
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
        if (socketMap[(clientCount - 1)]) {
            socket.emit('start');
            socketMap[(clientCount - 1)].emit('start');
        }
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
    bindListener(socket, 'time');
    bindListener(socket, 'lose');
    bindListener(socket, 'bottomLines');
    bindListener(socket, 'addTailLines');

    //客户端断开
    socket.on('disconnect', function () {
        if (socket.clientNum % 2 === 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit('leave'); 
            }
            
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit('leave');   
            }
        }

        delete(socketMap[socket.clientNum]);
    });
});

console.log('websocket listening on port' + PORT);
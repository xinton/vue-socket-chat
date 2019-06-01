var io = require('socket.io')(3555);
var typingUsers = [];

var emitChatMessage = function (msg) {
    io.emit('chat message', msg);
}

// Remove the typing user from list
var emitRemoveTypingNotification = function (socket) {
    typingUsers.splice(typingUsers.indexOf(socket.user), 1);
    io.emit('typing users', typingUsers);
}

io.on('connection', function (socket) {
    // set nickname
    socket.on('set nickname', function (nickname) {
        socket.user = nickname;
        emitChatMessage(`${nickname} as connected`);
    });

    // on disconnect
    socket.on('disconnect', function () {
        emitRemoveTypingNotification(socket)
        emitChatMessage(`${socket.user} disconnected`);
    });

    // chat message
    socket.on('chat message', function (msg) {
        emitRemoveTypingNotification(socket);
        emitChatMessage(`${socket.user}: ${msg}`);
    });

    // typing notification
    socket.on('typing', function () {
        // add typing user
        if (typingUsers.indexOf(socket.user) === -1) {
            typingUsers.push(socket.user)
        }
        io.emit('typing users', typingUsers);
    });
});
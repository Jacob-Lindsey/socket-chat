export const handleTypingStatus = (event, socket) => {
    socket.emit("typing");
    if (event.target.value === '') {
        socket.emit('stoppedTyping');
    };
};
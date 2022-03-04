export const handleSubmit = (event, socket, message, setMessage) => {
    event.preventDefault();
    if (message) {
        socket.emit("sendMessage", { message });
        setMessage('');
    }
};
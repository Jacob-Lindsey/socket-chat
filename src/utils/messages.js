const messages = [];

export const addMessage = (data) => {
    messages.push(data);
    return data;
};

export const getRoomMessages = (room) => {
    messages.filter((message) => message.room === room);
};
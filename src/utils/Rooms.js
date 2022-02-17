const rooms = [];

export const addUserToRoom = (room, username) => {
    rooms.filter((r) => r.id === room).map((r) => {
        r.users.push(username);
        return r;
    });
};

export const removeUserFromRoom = (room, user) => {
    rooms.filter((r) => r.id === room).map((r) => {
        r.filter(u => u.userID !== user.userID);
    });
};

export const createRoom = (id, name, owner) => {
    const room = {
        id: id,
        name: name,
        owner: owner,
        users: [owner],
        password: null,
    };

    rooms.push(room);
};


// TODO: Figure out how to store the list of rooms non-locally
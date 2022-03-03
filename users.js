let users = [];

const addUser = ({ id, name, room }) => {

  // Check if user exists in array
  const userExist = users.find((user) => {
    return user.room === room && user.name === name;
  });

  if (!name || !room) return { error: "Username and room are required." };
  if (userExist) return { error: "Username is already being used." };
  
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
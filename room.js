let rooms = [];

exports.addRoom = ({ id, name, room }) => {
  const room = {};

  rooms.push(room);

  return { room };
};
exports.removeRoom = (id) => {
  const index = rooms.findIndex((room) => room.id === id);
  return room[index];
};

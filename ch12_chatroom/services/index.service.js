const Room = require("../schemas/room");
const Chat = require("../schemas/chat");

exports.removeRoom = async (roomId) => {
  try {
    console.log(Room);

    await Room.deleteOne({ _id: roomId });
    await Chat.deleteOne({ room: roomId });
  } catch (error) {
    throw error;
  }
};

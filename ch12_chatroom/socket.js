const SocketIO = require("socket.io");

module.exports = (server, app) => {
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  room.on("connection", (socket) => {
    console.log("Connect room namespace");
    socket.on("disconnect", () => {
      console.log("Disconnect room namespace");
    });
  });

  chat.on("connection", (socket) => {
    console.log("Connect chat namespace");
    socket.on("join", (data) => {
      socket.join(data);
    });
    socket.on("disconnect", () => {
      console.log("Disconnect chat namespace");
    });
  });
};

const SocketIO = require("socket.io");
const { removeRoom } = require("./services/index.service");

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");
  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);

  chat.use(wrap(sessionMiddleware));

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
      socket.to(data).emit("join", {
        user: "system",
        chat: `${socket.request.session.color} joined`,
      });
    });
    socket.on("disconnect", async () => {
      console.log("Disconnect chat namespace");
      const { referer } = socket.request.headers;
      const roomId = new URL(referer).pathname.split("/").at(-1);
      const currentRoom = chat.adapter.rooms.get(roomId);
      const userCount = currentRoom?.size || 0;
      if (userCount === 0) {
        await removeRoom(roomId);
        room.emit("removeRoom", roomId);
        console.log("Request delete room : Sucess");
      } else {
        socket.to(roomId).emit("exit", {
          user: "system",
          chat: `${socket.request.session.color} left`,
        });
      }
    });
  });
};

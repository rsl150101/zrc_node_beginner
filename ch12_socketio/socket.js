const SocketIO = require("socket.io");

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" });

  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    console.log("Connect new client", ip, socket.id);
    socket.on("reply", (message) => {
      console.log(message);
    });
    socket.on("error", console.error);
    socket.on("disconnect", () => {
      console.log("Disconnect client", ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.interval = setInterval(() => {
      socket.emit("news", "Send message server to client");
    }, 3000);
  });
};

const WebSocket = require("ws");

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("Connect new client", ip);
    ws.on("message", (message) => {
      console.log(message.toString());
    });
    ws.on("error", console.error);
    ws.on("close", () => {
      console.log("Disconnect client", ip);
      clearInterval(ws.interval);
    });
    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send("Send message server to client");
      }
    }, 3000);
  });
};

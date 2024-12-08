const app = require("./app");
const webSocket = require("./socket");

const server = app.listen(app.get("port"), () => {
  console.log(`Listening on http://localhost:${app.get("port")}`);
});

webSocket(server, app);

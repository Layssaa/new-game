// -------------- WEBSOCKET ----------------
const routes = require("./routes");

// SEND ME A OBJECT LIKE THIS
// {
//   NAME: FULANO,
//   PATH: "LOGIN" | "LOGOUT"  "WALK"
//   ID: 1238943MAAAA
//}

const wsServer = (wss, WebSocket) => {
  wss.on("connection", (ws) => {
    ws.on("message", (data) => {
      const { receivedData, error } = parseData(data);

      if (error) {
        return ws.send({ message: "Please submit a json" });
      }

      if (!receivedData.path) {
        return ws.send(
          JSON.stringify({ message: "Please send the path of your data" })
        );
      }

      if (routes[`${receivedData.path}`]) {
        routes[receivedData.path](receivedData, ws, wss, WebSocket);
      } else {
        ws.send(
          JSON.stringify({
            message: "This path don't exist",
            statusCode: 404,
          })
        );
      }
    });
  });
};

module.exports = wsServer;

function parseData(_data) {
  try {
    const receivedData = JSON.parse(_data);
    return { receivedData };
  } catch (error) {
    return { error };
  }
}

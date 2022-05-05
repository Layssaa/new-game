const { listUsers, winner } = require("../__mock__/data-mock");
const { Connection } = require("./connection");

class EndGame extends Connection {
  constructor(_data, _ws, _wss, _WebSocket) {
    super(_data, _ws, _wss, _WebSocket);
    this.ws;
    this.data;
    this.chatList;
    this.hour;
    this.websocket;
  }

  notifyEndGame() {
    const { name, path, action, id } = this.data;

    if (winner.id) {
      return super.refuseConnection({
        action,
        path: "erro",
        description: "end game",
      });
    }

    super.setWinner({ id, name });

    const params = {
      id,
      name: listUsers[id],
      text: "endgame",
    };

    super.sendMessage({ name, path, action, params });
  }
}

module.exports = { EndGame };

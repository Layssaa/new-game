const { Connection } = require("./connection");
const { channels, moves, winner } = require("../__mock__/data-mock");

class Walk extends Connection {
  constructor(_data, _ws, _wss, _WebSocket) {
    super(_data, _ws, _wss, _WebSocket);
    this.ws;
    this.data;
    this.chatList;
    this.hour;
    this.websocket;
  }

  sendMovesPlayer() {
    const { id, move, channel, name } = this.data;

    if (winner.id) {
      return super.refuseConnection({
        action: "end",
        path: "end",
        description: "end game",
      });
    }

    moves[id] = move;

    channels[channel].forEach((client) => {
      if (client.readyState === this.websocket.OPEN) {
        client.send(
          JSON.stringify({
            status: 200,
            action: "walk",
            msg: {
              move: moves[id],
            },
            name, 
            ok: true,
            path: "walk",
            chatList: this.chatList,
            id,
            hour: this.hour,
            channel,
          })
        );
      }
    });
  }
}

module.exports = {
  Walk,
};

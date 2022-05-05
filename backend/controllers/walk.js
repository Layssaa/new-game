const { Connection } = require("./connection");
const { channels, moves, winner, listUsers } = require("../__mock__/data-mock");

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
    const { id, move, channel, direction } = this.data;

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
            name: listUsers[`${id}`],
            status: 200,
            action: "walk",
            move: moves[id],
            direction,
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

  sendLogoutMoves(){
    const { id, move, channel, direction } = this.data;

    channels[channel].forEach((client) => {
      if (client.readyState === this.websocket.OPEN) {
        client.send(
          JSON.stringify({
            name: listUsers[`${this.data.id}`],
            status: 200,
            action: "walk",
            move: [null, null],
            ok: true,
            path: "walk",
            chatList: this.chatList,
            id: this.data.id,
            hour: this.hour,
            channel: this.data.channel,
          })
        );
      }
    });
  }
}

module.exports = {
  Walk,
};

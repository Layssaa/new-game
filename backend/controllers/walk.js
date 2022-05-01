const { Connection } = require("./connection");
const { channels, moves } = require("../__mock__/data-mock");

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
    const data = this.data;
    moves[data.id] = data.move;

    channels[this.data.channel].forEach((client) => {
      if (client.readyState === this.websocket.OPEN) {
        client.send(
          JSON.stringify({
            status: 200,
            action: "walk",
            moved: moves[data.id],
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

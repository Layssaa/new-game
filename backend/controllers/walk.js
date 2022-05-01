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
    const { id, move, channel } = this.data;

    // if (this.winnner.id) {
    //   return super.refuseConnection({ action, path, description: "end game" });
    // }

    moves[id] = move;

    channels[channel].forEach((client) => {
      if (client.readyState === this.websocket.OPEN) {
        client.send(
          JSON.stringify({
            status: 200,
            action: "walk",
            msg: {
              moved: moves[id],
            },
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

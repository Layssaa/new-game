const { listUsers, channels, moves } = require("../__mock__/data-mock.js");
const { Disconnection } = require("./disconnection.js");

class Logout extends Disconnection {
  constructor(_data, _ws, _wss, _WebSocket) {
    super(_data, _ws, _wss, _WebSocket);
    this.ws;
    this.data;
    this.chatList;
    this.hour;
    this.websocket;
    this.userLeft = "";
    this.id;
    this.chatList;
  }

  logout() {
    this.id = this.data.id;
    this.userLeft = listUsers[this.data.id];
    this.channelLeft = channels[this.data.channel];
    delete moves[`${this.id}`];
    super.removeUserOnChannel();
    super.removePlayerOnList();
    super.removeObjectWS();
    this.notifyUser();
    this.sendNotifyForUsers();
  }

  sendNotifyForUsers() {
    this.channelLeft.forEach((client) => {
      if (client.readyState === this.websocket.OPEN && client.id !== this.id) {
        client.send(
          JSON.stringify({
            name: "server",
            msg: {
              text: `${this.userLeft} saiu do canal.`,
              users: Object.values(listUsers),
            },
            hour: this.hour,
            path: "logout",
          })
        );
      }
    });
  }

  notifyUser() {
    this.ws.send(
      JSON.stringify({
        status: 200,
        msg: {
          text: "Logout OK",
          users: Object.values(listUsers),
        },
        ok: true,
        path: "logout",
        hour: this.hour,
      })
    );
  }
}

module.exports = { Logout };
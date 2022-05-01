const { playersWS, listUsers, channels } = require("../__mock__/data-mock");

class Disconnection {
  constructor(_data, _ws, _wss, _WebSocket) {
    this.user;
    this.channel;
    this.data = _data;
    this.hour = new Date().toLocaleTimeString();
    this.ws = _ws;
    this.wss = _wss;
    this.websocket = _WebSocket;
    this.chatList = [];
  }

  removePlayerOnList() {
    if (listUsers[this.data.id]) {
      delete listUsers[this.data.id];
    }
  }

  removeObjectWS() {
    if (playersWS.includes(this.ws)) {
      playersWS = playersWS.filter((x) => {
        return x != value;
      });
    }
  }

  removeUserOnChannel() {
    if (channels[this.data.channel]) {
      channels[this.data.channel] = channels[this.data.channel].filter(
        (elem) => {
          return elem.id !== this.data.id;
        }
      );
    }
  }
}

module.exports = { Disconnection };

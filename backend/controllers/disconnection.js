const { playersWS, listUsers, channels } = require("../__mock__/data-mock");
const { Connection } = require("./connection");

class Disconnection extends Connection {
  constructor(_data, _ws, _wss, _WebSocket) {
    super(_data, _ws, _wss, _WebSocket);
    this.user;
    this.channel;
    this.data; 
    this.hour; 
    this.ws; 
    this.wss;
    this.websocket; 
    this.chatList;
  }

  removePlayerOnList() {
    if (listUsers[this.data.id]) {
      delete listUsers[this.data.id];
      delete this.ws.id
      super.getChatList();
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

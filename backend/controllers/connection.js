const crypto = require("crypto");
const {
  playersWS,
  listUsers,
  channels,
  moves,
  winner,
} = require("../__mock__/data-mock");

class Connection {
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

  duplicateName() {
    if (this.chatList.find((obj) => obj.name === this.data.name)) {
      this.ws.send(
        JSON.stringify({
          action: "entry",
          msg: {
            text: "Repeated name",
          },
          ok: false,
          path: "/login",
          hour: this.hour,
        })
      );
      return true;
    }
    return false;
  }

  verifyBeforeConection() {
    if (!this.data.id && !this.ws.id) {
      const id = crypto.randomBytes(20).toString("hex");
      this.data.id = id;
      this.ws.id = id;
    }
  }

  insertNameOnList() {
    if (!listUsers[this.data.id]) {
      listUsers[this.data.id] = this.data.name;
    }

    if (!moves[this.data.id]) {
      moves[this.data.id] = [];
    }
  }

  playersObjectWS() {
    const alreadyInsert = playersWS.find(function (elem) {
      return elem.id === this.data.id;
    });

    if (alreadyInsert) {
      playersWS.push(this.ws);
    }
  }

  validateChannel() {
    if (!channels[this.data.channel]) {
      this.ws.send(
        JSON.stringify({
          action: "entry",
          msg: {
            text: "invalid channel",
          },
          ok: false,
          path: "/login",
          hour: this.hour,
        })
      );
    }
    return;
  }

  insertUserOnChannel() {
    channels[this.data.channel].push(this.ws);
  }

  sendMessage({ name, path, action, params }) {
    channels[this.data.channel].forEach((client) => {
      if (client.readyState === this.websocket.OPEN) {
        client.send(
          JSON.stringify({
            action,
            name,
            msg: {
              ...params,
            },
            hour: this.hour,
            path,
            chatList: this.chatList,
          })
        );
      }
    });
  }

  refuseConnection({ action, path, description }) {
    return this.ws.send(
      JSON.stringify({
        status: 401,
        action,
        msg: {
          text: "Request refuse",
          description,
        },
        ok: false,
        path,
        hour: this.hour,
        channel: this.data.channel,
        chatList: this.chatList,
        id: this.data.id,
      })
    );
  }

  getChatList() {
    this.chatList = channels[this.data.channel].map(function (e) {
      if (listUsers[e.id]) {
        return {
          name: listUsers[e.id],
          id: e.id,
        };
      }
      return;
    });
  }

  setWinner({ id, name }) {
    winner.id = id;
    winner.name =  name;
  }

}

module.exports = { Connection };

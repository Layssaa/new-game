const { listUsers, winner, resetAll } = require("../__mock__/data-mock");
const { Connection } = require("./connection");

class EndGame extends Connection {
  constructor(_data, _ws, _wss, _WebSocket) {
    super(_data, _ws, _wss, _WebSocket);
    this.ws;
    this.data;
    this.chatList;
    this.hour;
    this.websocket;
    this.resetTimeOut = function () {};
  }

  setResetTimeOut(resetTimeOut) {
    this.resetTimeOut = resetTimeOut;
  }

  notifyEndGame(list) {
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
    
    this.notifyWinner();

    resetAll();

    for (let variableKey in listUsers){
      if (listUsers.hasOwnProperty(variableKey)){
          delete listUsers[variableKey];
      }
    }
    delete this.ws.id
    super.getChatList();

    setTimeout(() => {
      this.resetTimeOut(list);
    }, 1000);
  }

  notifyWinner() {
    return this.ws.send(
      JSON.stringify({
        status: 200,
        action: "end",
        msg: "You winner",
        ok: true,
        path: "end",
        hour: this.hour,
        channel: this.data.channel,
        chatList: this.chatList,
        id: this.data.id,
      })
    );
  }
}

module.exports = { EndGame };
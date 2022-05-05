class Player {
  constructor(_nickname) {
    this.nickname = _nickname;
    this.socket = new WebSocket("wss://localhost:5050");
    this.disabled = false;
    this.errors = [];
    this.channel = "general";
    this.data = {};
    this.onMessage = function () {};
    this.id;
  }

  setNickname(_nickname) {
    this.nickname = _nickname;
  }

  controls(enable) {
    if (enable) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  receidDataMethod(fun) {
    this.onMessage = fun;
  }

  init() {
    this.socket.onopen = () => {
      this.controls(false);
    };

    this.socket.onerror = (err) => {
      this.errors.push({
        created_at: new Date(),
        error: err,
      });
    };

    this.socket.onmessage = this.onMessage;
  }

  sendWalk({ move, id, direction }) {
    return this.socket.send(
      JSON.stringify({
        move: move,
        direction,
        name: this.nickname,
        path: "walk",
        id: id,
        channel: this.channel,
      })
    );
  }

  sendLogIn() {
    return this.socket.send(
      JSON.stringify({
        name: this.nickname,
        path: "login",
        channel: this.channel,
      })
    );
  }

  sendLogOut(id) {
    return this.socket.send(
      JSON.stringify({
        name: this.nickname,
        path: "logout",
        id,
        channel: this.channel,
      })
    );
  }

  sendEndGame(id) {
    return this.socket.send(
      JSON.stringify({
        action: "end",
        name: this.nickname,
        path: "end",
        id,
        channel: this.channel,
      })
    );
  }

  exit() {
    return this.socket.close();
  }
}

export default Player;

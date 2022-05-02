class Player {
  constructor(_nickname) {
    this.nickname = _nickname;
    this.socket = new WebSocket("wss://localhost:5050");
    this.disabled = false;
    this.errors = [];
    this.channel = "general";
    this.data = {};
    this.onMessage = function () {};
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
      this.sendLogIn();
    };

    this.socket.onerror = (err) => {
      console.log("error");
      console.log(err);
      this.errors.push({
        created_at: new Date(),
        error: err,
      });
    };

    this.socket.onmessage = this.onMessage;
  }

  sendWalk(param) {
    return this.socket.send(
      JSON.stringify({
        move: param.move,
        name: this.nickname,
        path: "walk",
        id: param.id,
        channel: this.channel,
      })
    );
  }

  sendLogIn() {
    this.socket.send(
      JSON.stringify({
        name: this.nickname,
        path: "login",
        channel: this.channel,
      })
    );
  }

  sendLogOut(param) {
    return this.socket.send(
      JSON.stringify({
        ...param,
        name: this.nickname,
        path: "logout",
        id: param.id,
        channel: this.channel,
      })
    );
  }

  exit() {
    return this.socket.close();
  }
}

export default Player;

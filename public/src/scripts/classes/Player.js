class Player {
  constructor(_nickname) {
    this.nickname = _nickname;
    this.socket = new WebSocket("wss://localhost:5050");
    this.disabled = false;
    this.errors = [];
    this.channel = "general";
    this.data = undefined;
  }

  controls(enable) {
    if (enable) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  init() {
    this.socket.onopen = () => {
      this.controls(false);
      this.sendLogIn();
    };

    this.socket.onerror = (err) => {
      this.errors.push({
        created_at: new Date(),
        error: err,
      });
    };
  }

  sendWalk(param) {
    this.socket.send({
      ...param,
      path: "walk",
      id: this.data.id,
      channel: this.data.channel,
    });
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
    this.socket.send({
      ...param,
      path: "logout",
      id: this.data.id,
      channel: this.data.channel,
    });
  }

  exit() {
    this.socket.close();
  }
}

export default Player;

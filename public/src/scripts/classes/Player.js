class Player {
  constructor(_nickname) {
    this.nickname = _nickname;
    this.socket = new WebSocket("ws://localhost:8080");
    this.disabled = false;
    this.errors = [];
  }

  controls(enable) {
    if (enable) {
      disabled = true;
    } else {
      disabled = false;
    }
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
  }

  exit() {
    this.socket.close();
  }
}

export default Player;

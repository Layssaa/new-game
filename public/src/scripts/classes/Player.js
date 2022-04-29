class Player {
  constructor(_nickname) {
    this.nickname = _nickname;
    this.socket = new WebSocket("ws://localhost:8080");
    this.disabled = false;
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
      console.error(err);
    };
  }

  exit() {
    this.socket.close();
  }
}

export default Player;

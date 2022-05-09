let playersWS = [];
let listUsers = {};

let channels = {
  general: [],
};

let winner = {};

let actualPlayer;

let moves = {
  user_mock: [],
};

function resetAll() {
  playersWS = [];
  listUsers = {};

  channels = {
    general: [],
  };

  winner = {};

  actualPlayer;

  moves = {
    user_mock: [],
  };
}

module.exports = {
  playersWS,
  listUsers,
  channels,
  actualPlayer,
  moves,
  winner,
  resetAll,
};

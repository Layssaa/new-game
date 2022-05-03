export const keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  space: 32,
};

export const move = {
  left: false,
  up: false,
  right: false,
  down: false,
  space: false,
};

export function keyDownHandler(_e) {
  const key = _e.keyCode;

  switch (key) {
    case keys.left:
      move.left = true;
      break;

    case keys.up:
      move.up = true;
      break;

    case keys.right:
      move.right = true;
      break;

    case keys.down:
      move.down = true;
      break;

    case keys.space:
      move.space = true;
      break;
  }
}

export function keyUpHandler(_e) {
  const key = _e.keyCode;

  switch (key) {
    case keys.left:
      move.left = false;
      break;

    case keys.up:
      move.up = false;
      break;

    case keys.right:
      move.right = false;
      break;

    case keys.down:
      move.down = false;
      break;

    case keys.space:
      move.space = false;
      break;
  }
}

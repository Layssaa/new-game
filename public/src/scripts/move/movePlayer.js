  //BASE DOS MOVIMENTOS PRA SEREM ADAPTADOS NO CÓDIGO DO LABIRINTO
  
  let LEFT = 37;
  let UP = 38;
  let RIGHT = 39;
  let DOWN = 40;

  let mvLeft = false;
  let mvUp = false;
  let mvRight = false;
  let mvDown = false;
  
  let tileSize = 96;

  let player = {
    x: tileSize + 2,
    y: tileSize + 2,
    // x: positions[positionRandom].x,
    // y: positions[positionRandom].y,
    width: 28,
    height: 28,
    speed: 7,
  };

  window.addEventListener("keydown", keydownHandler, false);
  window.addEventListener("keyup", keyupHandler, false);


  //tentei transformar as duas funções em uma só, mas deu erro no evento
  function keydownHandler(e) {
    let key = e.keyCode;
    switch (key) {
      case LEFT:
        mvLeft = true;
        break;
      case UP:
        mvUp = true;
        break;
      case RIGHT:
        mvRight = true;
      case DOWN:
        mvDown = true;
        break;
    }
  }

  function keyupHandler(e) {
    let key = e.keyCode;
    switch (key) {
      case LEFT:
        mvLeft = false;
        break;
      case UP:
        mvUp = false;
        break;
      case RIGHT:
        mvRight = false;
      case DOWN:
        mvDown = false;
        break;
    }
  }

  //vai dentro da função de update(), é o que faz o jogador andar conforme posição e velocidade
  if (mvLeft && !mvRight) {
    player.x -= player.speed;
  } else if (mvRight && !mvLeft) {
    player.x += player.speed;
  } else if (mvUp && !mvDown) {
    player.y -= player.speed;
  } else if (mvDown && !mvUp) {
    player.y += player.speed;
  }
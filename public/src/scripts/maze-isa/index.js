function game() {
  let cnv = document.querySelector("canvas");
  let ctx = cnv.getContext("2d");

  //largura e altura do canvas
  let WIDTH = cnv.width;
  let HEIGHT = cnv.height;

  //variáveis para mover o player
  let LEFT = 37;
  let UP = 38;
  let RIGHT = 39;
  let DOWN = 40;

  let mvLeft = false;
  let mvUp = false;
  let mvRight = false;
  let mvDown = false;

  //posições aleatórias em que o player pode começar no labirinto
  let positions = [
      {
        //ok
        x:1000,
        y: 1700
      },
      {
        //ok
        x:1800,
        y: 900
      },
      {
        //ok
        x: 1200,
        y: 900
      },
      {
        //ok
        x:1600,
        y: 1600
      },
      {
        //ok
        x: 200,
        y: 1200
      },
      {
        //ok
        x:450,
        y: 100
      }
  ]

  //geração do index aleatório
  let positionRandom = Math.floor(Math.random() * positions.length);

  console.log(positions[positionRandom])

  //tamanho da parede do labirinto em px
  let tileSize = 96;

  //arrays para armazenar o que é parede (1), e o que é porta de saída (2)
  let walls = [];
  let doors =[];

  //objeto player
  let player = {
    // x: tileSize + 2,
    // y: tileSize + 2,
    x: positions[positionRandom].x,
    y: positions[positionRandom].y,
    width: 28,
    height: 28,
    speed: 8,
  };

  //labirinto fixo
  let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 2],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  let T_WIDTH = maze[0].length * tileSize;
  let T_HEIGHT = maze.length * tileSize;

  //loop para armazenar os nºs 1 e 2 nos arrays de paredes e portas de saída
  for (let row in maze) {
    for (let column in maze[row]) {
      let tile = maze[row][column];
      if (tile === 1) {
        let wall = {
            x: tileSize*column,
            y: tileSize*row,
            width: tileSize,
            height: tileSize
        };
        walls.push(wall);
      }
      if (tile === 2) {
        let door = {
            x: tileSize*column,
            y: tileSize*row,
            width: tileSize,
            height: tileSize
        };
        doors.push(door);
      }
    }
  }

  //objeto câmera
  let cam = {
      x: 0,
      y: 0,
      width: WIDTH,
      height: HEIGHT,
      innerLeftBoundary: function(){
          return this.x + (this.width*0.25);
      },
      innerTopBoundary: function(){
        return this.y + (this.height*0.25);
      },
      innerRightBoundary: function(){
          return this.x + (this.width*0.75);
      },
      innerBottomBoundary: function(){
          return this.y + (this.height*0.75);
      }
  };

//player, wall - função de reconhecimento de colisão do player com a parede
  function blockRectangle(objA, objB){
    let distX = (objA.x + objA.width/2) - (objB.x + objB.width/2);
    let distY = (objA.y + objA.height/2) - (objB.y + objB.height/2);

    let sumWidth = (objA.width + objB.width)/2;
    let sumHeight = (objA.height + objB.height)/2;
    
    if(Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight){
        let overlapX = sumWidth - Math.abs(distX);
        let overlapY = sumHeight - Math.abs(distY);

        if(overlapX > overlapY){
            objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
        } else {
            objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
        }
    }
  }

//player, door - função de reconhecimento de colisão do player com a porta de saída
  function winnerMessage(objA, objB){
    let distX = (objA.x + objA.width/2) - (objB.x + objB.width/2);
    let distY = (objA.y + objA.height/2) - (objB.y + objB.height/2);

    let sumWidth = (objA.width + objB.width)/2;
    let sumHeight = (objA.height + objB.height)/2;
    
    if(Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight){
        let overlapX = sumWidth - Math.abs(distX);
        let overlapY = sumHeight - Math.abs(distY);

        if((overlapX > overlapY) || !(overlapX > overlapY)){
            console.log("ganhou")
        }
        //aqui dá um bugzinho, executa muitas vezes o console enquanto o player estiver na mesma posição da porta de saída, tem que botar algo pra finalizar o jogo
    }
  }

  //entradas das setas do teclado
  window.addEventListener("keydown", keydownHandler, false);
  window.addEventListener("keyup", keyupHandler, false);

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

  function update() {
    //movimento do player
    if (mvLeft && !mvRight) {
      player.x -= player.speed;
    } else if (mvRight && !mvLeft) {
      player.x += player.speed;
    } else if (mvUp && !mvDown) {
      player.y -= player.speed;
    } else if (mvDown && !mvUp) {
      player.y += player.speed;
    }

    for(let i in walls){
        let wall = walls[i];
        blockRectangle(player, wall);
    }

    for(let i in doors){
      let door = doors[i];
      winnerMessage(player, door);
  }

    if(player.x < cam.innerLeftBoundary()){
        cam.x = player.x - (cam.width * 0.25);
    }
    if(player.y < cam.innerTopBoundary()){
        cam.y = player.y - (cam.height * 0.25);
    }
    if(player.x + player.width > cam.innerRightBoundary()){
        cam.x = player.x + player.width - (cam.width * 0.75);
    }
    if(player.y + player.height > cam.innerBottomBoundary()){
        cam.y = player.y + player.height - (cam.height * 0.75);
    }

    cam.x = Math.max(0, Math.min(T_WIDTH - cam.width + 150, cam.x));
    cam.y = Math.max(0, Math.min(T_HEIGHT - cam.height + 150, cam.y));

  }

  
  //desenho do labirinto e player no canvas
  function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.save();
    ctx.translate(-cam.x, -cam.y);
    for (let row in maze) {
      for (let column in maze[row]) {
        let tile = maze[row][column];
        if (tile === 1) {
          let x = column * tileSize;
          let y = row * tileSize;
          ctx.fillRect(x, y, tileSize, tileSize);
        }
      }
    }
    ctx.fillStyle = "#00f";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.restore();
  }

  function loop() {
    update();
    render();
    requestAnimationFrame(loop, cnv);
  }
  requestAnimationFrame(loop, cnv);
}

game();

'use strict';


function Game() {
  var self = this;

  self.score = 0;
  self.gameIsOver = false;
  self.pause = false;
  self.firstSpace = false;

}

Game.prototype.start = function () {

  var self = this;

  self.gamePage = buildDom(`
    <main class="game container">
      <header id="site-header">
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value">5</span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value">0</span>
        </div>
      </header>
      <div class="canvas">
        <canvas id="gameField"></canvas>
      </div>
    </main>
  `);

  
  self.canvasParentElement = self.gamePage.querySelector('.canvas');
  self.canvasElement = self.gamePage.querySelector('canvas');

  document.body.appendChild(self.gamePage);

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.width;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.scoreElement = self.gamePage.querySelector('.score .value');
  self.livesElement = self.gamePage.querySelector('.lives .value');


  self.brickArray = [];
  // self.brick = new Brick(self.canvasElement, x, y, 60, 20);

  self.player = new Player(self.canvasElement, 5);
  self.playerX = self.player.x;
  self.ball = new Ball(self.canvasElement, self.playerX);

  self.wallLeft = new Walls(self.canvasElement, 3, self.canvasElement.height, 1, self.canvasElement.height / 2);
  self.wallTop = new Walls(self.canvasElement, self.canvasElement.width, 3, self.canvasElement.width / 2, 1);
  self.wallRight = new Walls(self.canvasElement, 3, self.canvasElement.height, self.canvasElement.width-1, self.canvasElement.height / 2);



  // ------ KEY COMMANDS ------

  self.handleKeyDown = function (event) {
    if (event.key === 'ArrowLeft'){
      self.player.setDirection(-1);
      if (self.firstSpace === false) {
        self.ball.setDirection(-1, 0);
      }
      // console.log('nice left key, brah');
    } if (event.key === 'ArrowRight'){
      self.player.setDirection(1);
      if (self.firstSpace === false) {
        self.ball.setDirection(1, 0);
      }
      // console.log('right key oleee');
    } if (event.key === ' ' && self.firstSpace === false){
      self.ball.setDirection(0.3, -1);
      self.ball.setSpeed(7)
      self.firstSpace = true;
      // console.log('space bar for the win');
    }
      if (event.key === 'e'){
      self.ball = null;
      self.ball = new Ball(self.canvasElement, self.playerX);
      self.firstSpace = false;
      // console.log('escape a default');
    }
  };

  self.handleKeyUp = function (event) {
    if (event.key === 'ArrowLeft'){
      self.player.setDirection(0);
      if (self.firstSpace === false) {
        self.ball.setDirection(0, 0);
      }
      // console.log('nice left key, brah');
    } if (event.key === 'ArrowRight'){
      self.player.setDirection(0);
      if (self.firstSpace === false) {
        self.ball.setDirection(0, 0);
      } 
      // console.log('right key oleee');
    }
  };

  document.addEventListener('keydown', self.handleKeyDown);
  document.addEventListener('keyup', self.handleKeyUp);

  // self.player.draw();
  // self.ball.draw();
  // self.wallLeft.draw();
  // self.wallTop.draw();
  // self.wallRight.draw();

  // self.brickArray.push[new Brick(self.canvasElement, 200, 150, 60, 20), new Brick(self.canvasElement, 350, 250, 60, 20)];
  // self.brickArray.forEach(function(item) {
  //   item.draw();
  // });

  self.brickArray = [];

  self.startingLine = self.canvasElement.width / 6;
  self.nextLine = self.startingLine / 6 + 6;

  self.brickLineBuilder(self.startingLine + self.nextLine * 0);
  self.brickLineBuilder(self.startingLine + self.nextLine * 1);
  self.brickLineBuilder(self.startingLine + self.nextLine * 2);
  self.brickLineBuilder(self.startingLine + self.nextLine * 3);
  self.brickLineBuilder(self.startingLine + self.nextLine * 4);
  self.brickLineBuilder(self.startingLine + self.nextLine * 5);
  self.brickLineBuilder(self.startingLine + self.nextLine * 6);

  self.startLoop();

};

Game.prototype.brickLineBuilder = function (y) {
  var self = this;

  self.brickWidth = self.canvasElement.width / 12
  

  for (var ix = 0; ix < 4; ix++) {
    self.brickArray.push(new Brick(self.canvasElement, self.canvasElement.width / 2 + (self.brickWidth + ix * 12) / 2 + ix * self.brickWidth + 3, y, self.brickWidth, self.brickWidth / 3))
  }

  for (var ix = 0; ix < 4; ix++) {
    self.brickArray.push(new Brick(self.canvasElement, self.canvasElement.width / 2 - (self.brickWidth + ix * 12) / 2 - ix * self.brickWidth - 3, y, self.brickWidth, self.brickWidth / 3))
  }

};

Game.prototype.startLoop = function () {
  var self = this;
  self.ctx = self.canvasElement.getContext('2d');

  function loop() {
    
    
    
    self.player.update();
    
    self.brickArray.forEach(function(item) {
      item.update();
    });
    
    // self.brick.update();
    
    self.ball.update();
    if (self.firstSpace === false) {
      self.ball.updateBeforeSpace(self.player);
    }
    
    // ------ Erase everything on canvas -------
    self.ctx.clearRect(0, 0, self.width, self.height);

    
    // ------ Draw Canvas -------

    self.player.draw();

    self.brickArray.forEach(function(item) {
      item.draw();
    });
    // self.brick.draw();
    self.ball.draw();
    self.wallLeft.draw();
    self.wallTop.draw();
    self.wallRight.draw();

    // Layout lines to add margin

    self.ctx.fillStyle = 'white';
    self.ctx.fillRect(2, self.canvasElement.height - 2, self.canvasElement.width - 4, 3);
    self.ctx.fillRect(2, 2, 3, self.canvasElement.height - 4);
    self.ctx.fillRect(self.canvasElement.width - 5, 2, 3, self.canvasElement.height - 4);

    // console.log("BAAAAALLL: " + (self.ball.x - self.ball.width / 2));
    // console.log("BRIIIIICK: " + (self.brick.x - self.brick.width / 2));
    // console.log("Brick Width Point = " + (self.brick.x + self.brick.width / 2));
    // console.log("Ball Width Point = " + (self.ball.x + self.ball.width / 2));
    

    // ------ Check Collisions ------
    self.checkCollisionWall();
    self.checkCollisionPlayer();
    self.checkCollisionBricks();
    self.clearBall();
    

    if(!self.gameIsOver) {
      window.requestAnimationFrame(loop);
    }

  };

  window.requestAnimationFrame(loop);
}


Game.prototype.checkCollisionWall = function () {
  var self = this;

  if (self.ball.collidedWithTopWall(self.wallTop)) {
    self.ball.directionChange(1, -1);
  }

  if (self.ball.collidedWithRightWall(self.wallRight)) {
    self.ball.directionChange(-1, 1);
  }

  if (self.ball.collidedWithLeftWall(self.wallLeft)) {
    self.ball.directionChange(-1, 1);
  }
}

Game.prototype.checkCollisionBricks = function () {
  var self = this;

  var brickCollision;
  var brickIndex;
  self.brickArray.find(function(item, index){
    brickCollision = self.ball.collidedWithBrick(item);
    brickIndex = index;
    return !!brickCollision;
  });
      
  if (brickCollision) {      
    self.brickArray.splice(brickIndex, 1);
    console.log('collision', brickCollision);

    self.ball.directionChange(brickCollision.x, brickCollision.y);
    self.score++;
    self.scoreElement.innerHTML = self.score;
    if (self.brickArray.length === 0) {
      self.gameOver();
    }
  } 
}


Game.prototype.checkCollisionPlayer = function () {
  var self = this;

  var playerCollision = self.ball.collidedWithPlayer(self.player);
  var directionVariation = 0;

  if (playerCollision) {
    if (self.ball.directionX === 0 ) {
      console.log('ball was coming from the straight top, homie');
      directionVariation = (self.ball.checkPositiontoPlayer(self.player)/50);
      self.ball.directionChangePlayer(directionVariation, playerCollision.y);
    } else if (self.ball.directionX < 0) {
      console.log('ball was coming from the right');
      if (self.ball.checkPositiontoPlayer(self.player) > 56 && !self.ball.checkPositiontoPlayer(self.player) < 0) {
        self.ball.directionChangePlayer(-1, -1);
      } else {
        directionVariation = (self.ball.checkPositiontoPlayer(self.player)/50);
        self.ball.directionChangePlayer(playerCollision.x - directionVariation**3 * 3, playerCollision.y);
      }
    } else if (self.ball.directionX > 0) {
      console.log('ball was coming from the left');
      if (self.ball.checkPositiontoPlayer(self.player) > -56 && !self.ball.checkPositiontoPlayer(self.player) > 0) {
        self.ball.directionChangePlayer(-1, -1);
      } else {
        directionVariation = (self.ball.checkPositiontoPlayer(self.player)/50);
        self.ball.directionChangePlayer(playerCollision.x + directionVariation**3 * 3, playerCollision.y);
      }
    } 
  }

}

Game.prototype.clearBall = function () {
  var self = this;
  self.playerX = self.player.x;

  if (self.ball.outOfArray()) {
    console.log('Ball is out. You SUCK! HAHA');
    self.player.setDirection(0);
    self.ball = null;
    self.ball = new Ball(self.canvasElement, self.playerX);
    self.firstSpace = false;
    self.player.lives--;
    self.livesElement.innerHTML = self.player.lives;
    console.log('Player got ' + self.player.lives + ' lives left.')

    if (!self.player.lives) {
      self.gameOver();
    }
  }
}

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
}

Game.prototype.gameOver = function () {
  var self = this;
  self.gameIsOver = true;
  self.onGameOverCallback();
}

Game.prototype.remove = function() {
  var self = this;

  self.gamePage.remove();
};



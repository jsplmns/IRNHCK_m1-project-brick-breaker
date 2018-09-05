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
      self.ball.setDirection(0.5, -1);
      self.ball.setSpeed(7)
      self.firstSpace = true;
      // console.log('space bar for the win');
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

  self.brickLineBuilder(200);
  self.brickLineBuilder(170);
  self.brickLineBuilder(140);
  self.brickLineBuilder(110);

  self.startLoop();

};

Game.prototype.brickLineBuilder = function (y) {
  var self = this;

  self.cw = self.canvasElement.width

  for (var ix = 0; ix < 4; ix++) {
    self.brickArray.push(new Brick(self.canvasElement, self.canvasElement.width / 2 + 35 + ix * 70, y, self.canvasElement.width / 12, self.canvasElement.width / 36))
  }

  for (var ix = 0; ix < 4; ix++) {
    self.brickArray.push(new Brick(self.canvasElement, self.canvasElement.width / 2 - 35 - ix * 70, y, self.canvasElement.width / 12, self.canvasElement.width / 36))
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
    
    if (self.firstSpace === false) {
      self.ball.updateBeforeSpace();
    } else {
      self.ball.update();
    }
    
    // ------ Erase everything on canvas -------
    self.ctx.clearRect(0, 0, self.width, self.height);
    

    // ------ Check Collisions ------
    self.checkCollisionWall();
    self.checkCollisionPlayer();
    self.checkCollisionBrick();
    self.clearBall();

    
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

    // console.log("BAAAAALLL: " + (self.ball.centerPoint[0] - self.ball.width / 2));
    // console.log("BRIIIIICK: " + (self.brick.centerPoint[0] - self.brick.width / 2));
    // console.log("Brick Width Point = " + (self.brick.centerPoint[0] + self.brick.width / 2));
    // console.log("Ball Width Point = " + (self.ball.centerPoint[0] + self.ball.width / 2));


    if(!self.gameIsOver) {
      window.requestAnimationFrame(loop);
    }

  };

  window.requestAnimationFrame(loop);
}


Game.prototype.checkCollisionWall = function () {
  var self = this;

  if (self.ball.collidedWithTopWall(self.wallTop)) {
    self.ball.collided(1, -1);
  }

  if (self.ball.collidedWithRightWall(self.wallRight)) {
    self.ball.collided(-1, 1);
  }

  if (self.ball.collidedWithLeftWall(self.wallLeft)) {
    self.ball.collided(-1, 1);
  }
}

Game.prototype.checkCollisionBrick = function () {
  var self = this;

  self.brickArray.forEach(function(item, index){
    var bounceDirection = self.ball.collidedWithBrick(item);
    
    if (bounceDirection) {
      
      self.brickArray.splice(index, 1);
      self.ball.collided(bounceDirection.x, bounceDirection.y);
      self.score++;
      self.scoreElement.innerHTML = self.score;
      if (self.brickArray.length === 0) {
        self.gameOver();
      }
    }  


  })
}


Game.prototype.checkCollisionPlayer = function () {
  var self = this;

  var bounceDirection = self.ball.collidedWithPlayer(self.player);

  if (bounceDirection) {
    self.ball.collided(bounceDirection.x, bounceDirection.y);
  }

  // if (self.ball.collidedWithPlayerTop(self.player)) {
  //   self.ball.collided(1, -1);
  // }

}

Game.prototype.clearBall = function () {
  var self = this;
  self.playerX = self.player.x;

  if (self.ball.outOfArray()) {
    console.log('Ball is out. You SUCK! HAHA');
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



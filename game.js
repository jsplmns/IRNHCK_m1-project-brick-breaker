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
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
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
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.brick = new Brick(self.canvasElement, 300, self.canvasElement.width / 2, self.canvasElement.height / 5);
  self.player = new Player(self.canvasElement, 5);
  self.ball = new Ball(self.canvasElement);

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
      console.log('nice left key, brah');
    } if (event.key === 'ArrowRight'){
      self.player.setDirection(1);
      if (self.firstSpace === false) {
        self.ball.setDirection(1, 0);
      }
      console.log('right key oleee');
    } if (event.key === ' ' && self.firstSpace === false){
      self.ball.setDirection(-0.5, -1);
      self.ball.setSpeed(10)
      self.firstSpace = true;
      console.log('space bar for the win');
    }
  };

  self.handleKeyUp = function (event) {
    if (event.key === 'ArrowLeft'){
      self.player.setDirection(0);
      if (self.firstSpace === false) {
        self.ball.setDirection(0, 0);
      }
      console.log('nice left key, brah');
    } if (event.key === 'ArrowRight'){
      self.player.setDirection(0);
      if (self.firstSpace === false) {
        self.ball.setDirection(0, 0);
      }
      console.log('right key oleee');
    }
  };

  document.addEventListener('keydown', self.handleKeyDown);
  document.addEventListener('keyup', self.handleKeyUp);

  self.brick.draw();
  self.player.draw();
  self.ball.draw();
  self.wallLeft.draw();
  self.wallTop.draw();
  self.wallRight.draw();

  self.startLoop();

};

Game.prototype.startLoop = function () {
  var self = this;
  self.ctx = self.canvasElement.getContext('2d');

  function loop() {
    
    self.ctx.clearRect(0, 0, self.width, self.height);

    self.checkCollisionWall();
    self.checkCollisionPlayer();
    self.clearBall();

    self.player.update();
    self.brick.update();

    if (self.firstSpace === false) {
      self.ball.updateBeforeSpace();
    } else {
      self.ball.update();
    }

    self.player.draw();
    self.brick.draw();
    self.ball.draw();
    self.wallLeft.draw();
    self.wallTop.draw();
    self.wallRight.draw();


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

Game.prototype.checkCollisionPlayer = function () {
  var self = this;

  if (self.ball.collidedWithPlayerTop(self.player)) {
    self.ball.collided(1, -1);
  }

  if (self.ball.collidedWithPlayerRight(self.player)) {
    self.ball.collided(-1, 1);
  }  

  if (self.ball.collidedWithPlayerLeft(self.player)) {
    self.ball.collided(-1, 1);
  }  
}

Game.prototype.clearBall = function () {
  var self = this;

  if (self.ball.outOfArray()) {
    console.log('Ball is out. You SUCK! HAHA');
    self.ball = null;
  }
}



Game.prototype.remove = function() {
  var self = this;

  self.gamePage.remove();
};



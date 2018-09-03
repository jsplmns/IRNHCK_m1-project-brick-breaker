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
      self.ball.setDirection(1, -1);
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

  self.startLoop();

};

Game.prototype.startLoop = function () {
  var self = this;
  self.ctx = self.canvasElement.getContext('2d');

  function loop() {
    
    self.ctx.clearRect(0, 0, self.width, self.height);

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


    if(!self.gameIsOver) {
      window.requestAnimationFrame(loop);
    }

  };

  window.requestAnimationFrame(loop);
}


Game.prototype.remove = function() {
  var self = this;

  self.gamePage.remove();
};



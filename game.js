'use strict';


function Game() {
  var self = this;

  self.score = 0;
  self.gameIsOver = false;
  self.pause = false;
  self.firstSpace = false;

  self.iArray = [[1, 1, 1], [1, 1, 1], [0, 0 , 0], [1, 1, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1], [0, 0 , 0], [1, 1, 1], [1, 1, 1]];
  self.rArray = [[1, 1, 1], [1, 1, 1], [0, 0 , 0], [1, 1, 0], [1, 0, 1], [1, 1, 0], [1, 0, 1], [1, 0, 1], [0, 0 , 0], [1, 1, 1], [1, 1, 1]];
  self.nArray = [[1, 1, 1], [1, 1, 1], [0, 0 , 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 0, 1], [0, 0 , 0], [1, 1, 1], [1, 1, 1]];
  self.hArray = [[1, 1, 1], [1, 1, 1], [0, 0 , 0], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1], [0, 0 , 0], [1, 1, 1], [1, 1, 1]];
  self.cArray = [[1, 1, 1], [1, 1, 1], [0, 0 , 0], [0, 1, 1], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, 1, 1], [0, 0 , 0], [1, 1, 1], [1, 1, 1]];
  self.kArray = [[1, 1, 1], [1, 1, 1], [0, 0 , 0], [1, 0, 1], [1, 0, 1], [1, 1, 0], [1, 0, 1], [1, 0, 1], [0, 0 , 0], [1, 1, 1], [1, 1, 1]];

  self.fullLine = [self.iArray, self.rArray, self.nArray, self.hArray, self.cArray, self.kArray]


}

Game.prototype.start = function () {

  var self = this;

  self.gamePage = buildDom(`
    <main class="game-screen fade-in">
      <div class="explanation">
        <div class="explain-top">
          <h2>touch or press space to start</h2>
        </div>
        <div class="explain-left">
          <div class="devider"></div>
          <h2>touch or press right arrow to go right</h2>
        </div>
        <div class="explain-right">
          <h2>touch or press left arrow to go left</h2>
          <div class="devider"></div>
        </div>
      </div>
        
      <div class="controlls">
        <div class="touch-top"></div>
        <div class="touch-left">
          <div class="devider"></div>
          <div class="devider"><button>Right</button></div>
        </div>
        <div class="touch-right">
          <div class="devider"><button>Left</button></div>
          <div class="devider"></div>
        </div>
      </div>

      <header class"container">
       <img src="https://static1.squarespace.com/static/54318ac9e4b08711a4a470ed/t/5b92355c03ce64853a947ea9/1536308574574/title_img.png?format=2500w" alt="brick breaker header image"  class="header-image">
      </header>
      <section class="game container">
        <div class="lives counter">
          <span class="label">Lives:</span>
          <span class="value">5</span>
        </div>
        <div class="canvas">
          <canvas id="gameField"></canvas>
        </div>
        <div class="score counter">
          <span class="label">Score:</span>
          <span class="value">0</span>
        </div>
      </section>
      <footer>
        <div>
          <p>created with ♥ at Ironhack BCN</p>
        </div>
      </footer>
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

  self.leftControllElement = self.gamePage.querySelector('.touch-left');
  self.rightControllElement = self.gamePage.querySelector('.touch-right');
  self.topControllElement = self.gamePage.querySelector('.touch-top');


  self.brickArray = [];
  // self.brick = new Brick(self.canvasElement, x, y, 60, 20);

  self.player = new Player(self.canvasElement, 5);
  self.playerX = self.player.x;
  self.ball = new Ball(self.canvasElement, self.playerX);

  self.wallLeft = new Walls(self.canvasElement, 6, self.canvasElement.height, 3, self.canvasElement.height / 2);
  self.wallTop = new Walls(self.canvasElement, self.canvasElement.width, 6, self.canvasElement.width / 2, 1);
  self.wallRight = new Walls(self.canvasElement, 6, self.canvasElement.height, self.canvasElement.width-3, self.canvasElement.height / 2);
  self.wallBottom = new Walls(self.canvasElement, self.canvasElement.width, 2, self.canvasElement.width / 2, self.canvasElement.height - 1);



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


  self.handleTouchStartLeft = function(element) {
    if (element.touches) {
      self.player.setDirection(1);
    }
  };

  self.handleTouchStartRight = function(element) {
    if (element.touches) {
      self.player.setDirection(-1);
    }
  };

  self.handleTouchStartTop = function(element) {
    if (element.touches && self.firstSpace === false) {
      self.ball.setDirection(0.3, -1);
      self.ball.setSpeed(5);
      self.firstSpace = true;
    }
  };

  self.handleTouchEnd = function(element) {
    if (element.touches) {
      self.player.setDirection(0);
    }
  };

  self.leftControllElement.addEventListener('touchstart', self.handleTouchStartLeft, false);
  self.rightControllElement.addEventListener('touchstart', self.handleTouchStartRight, false);
  self.topControllElement.addEventListener('touchstart', self.handleTouchStartTop, false);
  self.leftControllElement.addEventListener('touchend', self.handleTouchEnd, false);
  self.rightControllElement.addEventListener('touchend', self.handleTouchEnd, false);


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


  // self.brickLineBuilder(self.startingLine + self.nextLine * 1);
  // self.brickLineBuilder(self.startingLine + self.nextLine * 2);
  self.brickLineBuilder(self.startingLine + self.nextLine * 3);


  // self.allChar();

  self.startLoop();

};

Game.prototype.brickLineBuilder = function (y) {
  var self = this;

  self.brickWidth = self.canvasElement.width / 3
  

  for (var ix = 0; ix < 1; ix++) {
    self.brickArray.push(new Brick(self.canvasElement, self.canvasElement.width / 2 + (self.brickWidth + ix * 12) / 2 + ix * self.brickWidth + 3, y, self.brickWidth, self.brickWidth / 3))
  }

  for (var ix = 0; ix < 1; ix++) {
    self.brickArray.push(new Brick(self.canvasElement, self.canvasElement.width / 2 - (self.brickWidth + ix * 12) / 2 - ix * self.brickWidth - 3, y, self.brickWidth, self.brickWidth / 3))
  }

};


Game.prototype.allChar = function () {

  var self = this;

  self.startingLine = self.canvasElement.width / 6;
  self.nextLine = self.startingLine / 6 + 6;
  
  self.brickWidth = self.canvasElement.width / 33

  var startingBuild = self.brickWidth * 2.5;
  var startingBuild1 = self.brickWidth * 7.5;
  var startingBuild2 = self.brickWidth * 12.5;
  var startingBuild3 = self.brickWidth * 17.5;
  var startingBuild4 = self.brickWidth * 22.5;
  var startingBuild5 = self.brickWidth * 27.5;
  
  self.brickCharBuilder(startingBuild, 0);
  self.brickCharBuilder(startingBuild1, 1);
  self.brickCharBuilder(startingBuild2, 2);
  self.brickCharBuilder(startingBuild3, 3);
  self.brickCharBuilder(startingBuild4, 4);
  self.brickCharBuilder(startingBuild5, 5);
  
  // for (var ix = 0; ix < self.fullLine.length; ix++) {
  //   startingBuild = 
  // }

}


Game.prototype.brickCharBuilder = function (start, index) {
  
  var self = this;
  self.startingLine = self.canvasElement.width / 6;
  self.nextLine = self.startingLine / 6 + 6;
  
  self.brickWidth = self.canvasElement.width / 33;
  self.startingPoint = start;
  self.matrixX = self.startingPoint;
  self.storeMatrixX = (self.brickWidth / 2 + 3) * 2;
  self.initialMatrixX = self.matrixX;
  self.initialMatrixY = self.startingLine + self.nextLine * 0;
  self.matrixY = self.initialMatrixY;


    self.fullLine[index].forEach(function(arrayLine){
      arrayLine.forEach(function(item){
        if (item) {
          self.brickArray.push(new Brick(self.canvasElement, self.matrixX, self.matrixY, self.brickWidth, self.brickWidth / 3));
          self.matrixX = self.matrixX + self.storeMatrixX;
        } else {
          self.matrixX = self.matrixX + self.storeMatrixX;
        }
      });
      self.matrixX = self.initialMatrixX;
      self.matrixY = self.matrixY + self.brickWidth;
    });

};


// Game.prototype.brickLineBuilder = function (y) {
//   var self = this;

//   self.brickWidth = self.canvasElement.width / 33
  

//   for (var ix = 0; ix < 12; ix++) {
//     self.brickArray.push(new Brick(self.canvasElement, self.canvasElement.width / 2 + (self.brickWidth + ix * 33) / 2 + ix * self.brickWidth / 2 + 3, y, self.brickWidth, self.brickWidth / 3))
//   }

//   for (var ix = 0; ix < 12; ix++) {
//     self.brickArray.push(new Brick(self.canvasElement, self.canvasElement.width / 2 - (self.brickWidth + ix * 33) / 2 - ix * self.brickWidth / 2 - 3, y, self.brickWidth, self.brickWidth / 3))
//   }

// };



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
    self.wallBottom.draw();

    // Layout lines to add margin

    self.ctx.fillStyle = 'white';
    self.ctx.fillRect(5, self.canvasElement.height - 5, self.canvasElement.width - 10, 3);
    self.ctx.fillRect(5, 4, 3, self.canvasElement.height - 6);
    self.ctx.fillRect(self.canvasElement.width - 8, 4, 3, self.canvasElement.height - 6);

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

// Game.prototype.animateBricks = function() {
//   var self = this;
  
//   window.setInterval(function() {
//     self.brickArray.forEach(function(item) {
//       item.draw();
//     });

//   }, 300);

// }

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
    // console.log('collision', brickCollision);

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
      // console.log('ball was coming from the straight top, homie');
      directionVariation = (self.ball.checkPositiontoPlayer(self.player)/50);
      self.ball.directionChangePlayer(directionVariation, playerCollision.y);
    } else if (self.ball.directionX < 0) {
      // console.log('ball was coming from the right');
      if (self.ball.checkPositiontoPlayer(self.player) > 56 && !self.ball.checkPositiontoPlayer(self.player) < 0) {
        self.ball.directionChangePlayer(-1, -1);
      } else {
        directionVariation = (self.ball.checkPositiontoPlayer(self.player)/50);
        self.ball.directionChangePlayer(playerCollision.x - directionVariation**3 * 3, playerCollision.y);
      }
    } else if (self.ball.directionX > 0) {
      // console.log('ball was coming from the left');
      if (self.ball.checkPositiontoPlayer(self.player) > -56 && !self.ball.checkPositiontoPlayer(self.player) > 0) {
        self.ball.directionChangePlayer(-1, -1);
      } else {
        directionVariation = (self.ball.checkPositiontoPlayer(self.player)/50);
        self.ball.directionChangePlayer(playerCollision.x + directionVariation**3 * 3, playerCollision.y);
      }
    } 
  }

  normalize(self.ball.directionX, self.ball.directionY, self.ball.speed)

}

Game.prototype.clearBall = function () {
  var self = this;
  self.playerX = self.player.x;

  if (self.ball.outOfArray()) {
    // console.log('Ball is out. You SUCK! HAHA');
    self.player.setDirection(0);
    self.ball = null;
    self.ball = new Ball(self.canvasElement, self.playerX);
    self.firstSpace = false;
    self.player.lives--;
    self.livesElement.innerHTML = self.player.lives;
    // console.log('Player got ' + self.player.lives + ' lives left.')

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

function normalize(pointX, pointY, scale) {
  var norm = Math.sqrt(pointX * pointX + pointY * pointY);   
  if (norm != 0) {// as3 return 0,0 for a point of zero length
    pointX = scale * pointX / norm;     
    pointY = scale * pointY / norm;   
  };
}


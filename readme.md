# Project's name

## Description
Bricks in the upper third of the canvas have to be broken with a ball that bounces off walls and bricks. The player can control a pad that goes left and right on the bottom of the canvas. He can bounce off the ball in different angles depending on where the ball hits the pad.

## Development
This game might use SCSS. If so, use the following line in the terminal to compile to CSS:
node-sass --output-style compressed --source-map true --watch style.scss style.css

### Winning / Losing Condition:
The player wins the game, if he manages to break all bricks.
The player loses lives, when the ball goes out on the bottom of the canvas and loses the game, once all lives have been deducted.


## MVP (DOM - CANVAS)
The MVP of the projects can start a game with one brick. The canvas is fully setup with borders on both sides and on the top. The player pad is fully setup with 3 different angle variables ( -45°, 0°, 45°) from which the ball changes its direction.


## Backlog
- add more bricks
- add more angles to pad (-70°, -45°, -25°, 0°, 25°, 45°, 70°)
- make ball actually round
- add timer
- add bricks back in after some time
- add different bricks
- add mobile controll
- make single brick more interesting:
  * make brick avoid the ball (IMPOSSIBLE WIN)
  * make brick invisible
  * make brick change it's size
  * make brick move


## Data structure

### main.js
```javascript
function buildDOM()

function main() {
  buildSplashPage();
  buildGamePage();
  buildGameOverPage();

  destroySplashPage();
  destroyGamePage();
  destroyGameOverPage();

  var game = new Game({
    buildCanvas ();
    
    self.player = new Player ();
    self.walls = new Walls ();
    self.bricks = new Bricks ();
    self.ball = new Ball ();
  });

}

```


### game.js
```javascript

  function Game(){};
    Game.drawBoard();
      self.width = device width;
      self.heigth = device height;
      ctx: ctx,
      backgroundcolor = ['xxx','xxx','xxx'],
      
    Game.drawPlayer();
    Game.drawWalls();
    Game.drawBricks();
    Game.drawBall();
    
    Game.loop();
    
    Game.gameOver();

  garbageCollector;


```


#### walls.js
```javascript
var self = this;

// Wall Left
self.x = 10  
self.y = canvas.height / 2  
self.size = canvas.height  

// Wall Right
self.x = canvas.width -10  
self.y = canvas.height / 2  
self.size = canvas.height  


// Wall Top
self.x = canvas.width / 2  
self.y = 10  
self.size = canvas.width  

Walls.draw(){
  self.width = device width;
  self.heigth = device height;
  ctx: ctx,
  backgroundcolor = ['xxx','xxx','xxx'],
}
```


#### Bricks.js
```javascript
var self = this;
self.x = canvas width / 2  
self.y = canvas height /4  

function Bricks() {
  self.height
  self.width
}

Bricks.draw(){
  self.width = device width;
  self.heigth = device height;
  ctx: ctx,
  backgroundcolor = ['xxx','xxx','xxx'],
}
```


#### ball.js
```javascript
var self = this;
self.x = canvas.width / 2  
self.y = canvas.height -20  
self.height = 8px;
self.width = 8px;
self.direction = ( x && y )  
self.speed = speed

function Ball() {
  self.height
  self.width
}

function colidedWithBrick() {
  // depending on side of Brick
    * self.direction = direction.invert
}

function colidedWithWall(){
  // depending on which wall
  * self.direction = direction.invert
}

function colidedWithPad(){
  // depending on part of Brick
    * self.direction = self.setNewDirection()
}

Ball.setNewDirection()

Ball.update()  

Ball.draw(){
  self.width = device width;
  self.heigth = device height;
  ctx: ctx,
  backgroundcolor = ['xxx','xxx','xxx'],
}
```


#### player.js
```javascript
var self = this;
self.x = canvas.width / 2;  
self.y = canvas.height -10;  
self.width = 
self.height =
self.direction = ( x +1 || x -1 );  
self.lives = lives;
self.blockSize = 10px;

var playerBlock = [block0, block1, block 2]

Player.update()  

Function playerBlocks() {
  
  player[0].draw(){  
    self.x = canvas.width / 2 - 10
    self.y = canvas.height - 10;
    self.blockSize
  }
  
  player[1].draw(){  
    self.x = canvas.width / 2
    self.y = canvas.height - 10;
    self.blockSize
  }
  
  player[2].draw(){  
    self.x = canvas.width / 2 + 10
    self.y = canvas.height - 10;
    self.blockSize
  }
  
}
```





## States & States Transitions
Definition of the different states and their transition (transition functions)

### Splash Page:
```html
<main>
  <div>
    <h1></h1>
    <button></button>
  </div>
</main>
```

### GAME Page:
```html
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
    <canvas></canvas>
  </div>
</main>
```

### gameOver Page:
```html
<main>
  <div>
    <h1></h1>
    <p><span></span></p>
    <button></button>
  </div>
</main>
```

### gameOverWin Page:
```html
<main>
  <div>
    <h1></h1>
    <p><span></span></p>
    <button></button>
  </div>
</main>
```


### LoadGame ()

+ build Splash
+ addEventListener()


### Start ()

+ destroy Slash
+ destroy gameOverScreen
+ destroy gameOverWinScreen

+ build GAME

+ create new Player()
+ create new Walls()
+ create new Brick()
+ create new Ball()

+ addEventListener()
  * keyup spacebar
  * keypress leftArrow
  * keyup leftArrow
  * keypress rightArrow
  * keyup rightArrow

+ start Loop ()


### Loop ()

+ clear canvas

+ update ball
+ update player

+ draw wall
+ draw brick
+ draw player
+ draw ball

+ checkForCollisionWithBrick
  * remove Brick
  * if noBrickLeft
    * go to gameOverWin Page
  + checkForSideOfBrick
    * setNewDirectionBall

+ checkForCollisionWithWall
  + checkWhichWall
    * setNewDirectionBall

+ checkForCollisionWithPlayer
  + checkPositionOnPlayer
    * setNewDirectionBall

+ checkIfOutOfCanvas
  * remove Ball
  * reduct life
  * if outOfLives
    * go to gameOver Page


### gameOver ()
+ destroy GAME Page
+ build gameOver Page
+ addEventListener()



### gameOverWin ()
+ destroy GAME Page
+ build gameOverWin Page
+ addEventListener()



## Task
Task definition in order of priority


## Links


### Trello
Will be added
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/jsplmns/IRNHCK_m1-project-brick-breaker)  


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)

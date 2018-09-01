'use strict';

var gamePage;
var canvas = document.getElementById('gameField');

function Game() {

  gamePage = buildDom(`
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
        <canvas id='gameField'></canvas>
      </div>
    </main>

  `);

  document.body.appendChild(gamePage);
  
  // var brickElement = new Brick();
  
  // function createBrick() {
  //   brickElement.drawBrick();
  // }
  
  function draw() {
    var canvas = document.getElementById('gameField');
  
    var ctx = canvas.getContext('2d');
    console.log(ctx); // CanvasRenderingContext2D { ... }
  
  
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  
  }
  
  draw();
  
}




Game.prototype.remove = function() {

  gamePage.remove();
};
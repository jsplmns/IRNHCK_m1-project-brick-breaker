'use strict';

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}


function main() {

  var splashMain;
  var gameOver;

  var game;
  var irnhck;

  // --- Build Splash Page ---

  function buildSplash() {

    if (gameOver) {
      destroyGameOver();
    }

    splashMain = buildDom(`
      <main class="start-screen fade-out">
        <div>
          <h1>Brick Breaker</h1>
          <button>Play</button>
        </div>
      </main>
    `);

    document.body.appendChild(splashMain);

    var playButton = document.querySelector('button');
    playButton.addEventListener('click', startGame);

    var handleKeyPress = function(event) {
      if (event.key === "Enter"){
        startGame();
      }
    }

    document.addEventListener("keypress", handleKeyPress);

  }


  // --- start Game ---

  function startGame() {
    
    destroySplash();
    
    if (gameOver) {
      destroyGameOver();
    }
    
    game = new Game();

    game.start();

    game.onOver(function () {
      buildGameOver(game.score);
    });

    // --- TimeOut to test redirection to Gameover Page

    // window.setTimeout(function(){
    //   buildGameOver();
    // }, 3000);
  }

  // --- start IrnhckSpecial ---

  function startIrnhck() {
    
    destroySplash();
    
    if (gameOver) {
      destroyGameOver();
    }
    
    irnhck = new Irnhck();

    irnhck.start();

    irnhck.onOver(function () {
      buildGameOver(irnhck.score);
    });

    // --- TimeOut to test redirection to Gameover Page

    // window.setTimeout(function(){
    //   buildGameOver();
    // }, 3000);
  }


  // --- Build GameOver ---

  function buildGameOver(score) {

    if (game) {
      destroyGame();
    }

    if (irnhck) {
      destroyIrnhck();
    }


    gameOver = buildDom(`
      <main class="end-screen">
        <div>
          <h1>Game Over</h1>
          <p>You have scored <span></span> Points</p>
          <button class="play">Play again</button>
          <button class="menu">Back to Menu</button>
          <button class="iro">Go full Irnhck</button>
        </div>
      </main>

    `)

    document.body.appendChild(gameOver)

    var playAgain = document.querySelector('button.play');
    var backToMenu = document.querySelector('button.menu');
    var fullIrnhck = document.querySelector('button.iro');

    var scoreElement = document.querySelector('span');
    scoreElement.innerHTML = score;

    playAgain.addEventListener('click', startGame);
    backToMenu.addEventListener('click', buildSplash);
    fullIrnhck.addEventListener('click', startIrnhck);

  }

  // --- destroy previous screens

  function destroySplash() {
    splashMain.remove();
  }

  function destroyGame() {
    game.remove();
  }

  function destroyIrnhck() {
    irnhck.remove();
  }

  function destroyGameOver() {
    gameOver.remove();
  }



  // --- initialize
  buildSplash();
  startGame();

}

window.addEventListener('load', main);
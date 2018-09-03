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

  // --- Build Splash Page ---

  function buildSplash() {

    if (gameOver) {
      destroyGameOver();
    }

    splashMain = buildDom(`
      <main class="start-screen">
        <div>
          <h1>Brick Breaker</h1>
          <button>Play</button>
        </div>
      </main>
    `);

    document.body.appendChild(splashMain);

    var playButton = document.querySelector('button');
    playButton.addEventListener('click', startGame);

  }


  // --- start Game ---

  function startGame() {
    
    destroySplash();
    
    if (gameOver) {
      destroyGameOver();
    }
    
    game = new Game();

    game.start();

    // --- TimeOut to test redirection to Gameover Page

    // window.setTimeout(function(){
    //   buildGameOver();
    // }, 3000);
  }

  // --- Build GameOver ---

  function buildGameOver() {

    destroyGame();

    gameOver = buildDom(`
      <main class="end-screen">
        <div>
          <h1>Game Over</h1>
          <p>You have scored <span></span> Points</p>
          <button class="play">Play again</button>
          <button class="menu">Back to Menu</button>
        </div>
      </main>

    `)

    document.body.appendChild(gameOver)

    var playAgain = document.querySelector('button.play');
    var backToMenu = document.querySelector('button.menu');

    playAgain.addEventListener('click', startGame)
    backToMenu.addEventListener('click', buildSplash)

  }

  // --- destroy previous screens

  function destroySplash() {
    splashMain.remove();
  }

  function destroyGame() {
    game.remove();
  }

  function destroyGameOver() {
    gameOver.remove();
  }



  // --- initialize
  buildSplash();
  startGame();

}

window.addEventListener('load', main);
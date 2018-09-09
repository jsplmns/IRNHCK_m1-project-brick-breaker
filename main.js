'use strict';

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}


function main() {

  var splashMain;
  var gameOver;
  var enter = false;

  var game;
  var irnhck;

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

    var handleKeyPress = function(event) {
      if (event.key === "Enter" && enter === false){
        enter = true;
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

  function startIrnhck(input) {
    
    if (splashMain) {
      destroySplash();
    }
    
    if (gameOver) {
      destroyGameOver();
    }
    
    irnhck = new Irnhck(input);

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
          <h1>Well that was fun</h1>
          <p>You have scored <span></span> Points</p>
          <div class="quick-nav">
            <label for="input-name">now enter your name <br></label>
            <div class="search-bar container">
              <input type="text" id="input-name" maxlength="6">
            </div>
          </div>
          <button class="iro">Go!</button>
          <button class="or back to menu">Back to Menu</button>
        </div>
      </main>

    `)

    document.body.appendChild(gameOver)

    var backToMenu = document.querySelector('button.menu');
    var fullIrnhck = document.querySelector('button.iro');
    var input = document.querySelector('#input-name');
    var brickName = input.value;
    
    var scoreElement = document.querySelector('span');
    scoreElement.innerHTML = score;
    
    input.addEventListener('keyup', handleKeyPress);
    
    function handleKeyPress(event) {
      var brickName = input.value;
      var brickLower = brickName.toLowerCase();
      // console.log(brickLower);

      if (event.key === "Enter"){
        startIrnhck(brickLower);
      }
    }

    function handleGo(event) {
      var brickName = input.value;
      var brickLower = brickName.toLowerCase();

      startIrnhck(brickLower);

    }
 
    backToMenu.addEventListener('click', buildSplash);
    fullIrnhck.addEventListener('click', handleGo);

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

}

window.addEventListener('load', main);
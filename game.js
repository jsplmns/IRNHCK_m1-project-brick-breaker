'use strict';

var gamePage;

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
        <canvas></canvas>
      </div>
    </main>

  `);

  document.body.appendChild(gamePage);


}


Game.prototype.remove = function() {

  gamePage.remove();
};
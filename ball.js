'use strict';


function Ball(canvas) {
  var self = this;
  
  self.canvas = canvas;
  self.width = 10;
  self.height= 10;
  self.x = self.canvas.width / 2;
  self.y = self.canvas.height - 29;
  self.ctx = self.canvas.getContext('2d');
  self.directionX = 0;
  self.directionY = 0;
  self.speed = 5;
};

Ball.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'blue';
  self.ctx.fillRect(self.x - self.width / 2, self.y - self.height /2, self.width, self.height);

};

Ball.prototype.setDirection = function (directionX, directionY) {
  var self = this;

  self.directionX = directionX;
  self.directionY = directionY;
}

Ball.prototype.setSpeed = function (speed) {
  var self = this;

  self.speed = speed;
}

Ball.prototype.collided = function (directionX, directionY) {
var self = this;

  self.directionX = self.directionX * directionX;
  self.directionY = self.directionY * directionY;

}


// ------ COLLISIONS ------


Ball.prototype.collidedWithTopWall = function (wall) {

  var self = this;
  var results = true;

   const collidesTop = self.y - self.height / 2 < wall.y + wall.height / 2;
 
  if (collidesTop) {
    console.log('Collision TOOOOOOP');
    return results;
  }

}

Ball.prototype.collidedWithRightWall = function (wall) {

  var self = this;
  var results = true;

  const collidesRight = self.x + self.width / 2 > wall.x - wall.width / 2;

  if (collidesRight) {
    console.log('Collision RIIIIIIIGHT');
    return results;
  }

}

Ball.prototype.collidedWithLeftWall = function (wall) {

  var self = this;
  var results = true;

  const collidesLeft = self.x - self.width / 2 < wall.x + wall.width / 2;

  if (collidesLeft) {
    console.log('Collision LEEEEEEEEEFT');
    return results;
  }

}


Ball.prototype.collidedWithPlayerTop = function (player) {

  var self = this;
  var results = true;

  const collidesTop = self.y + self.height / 2 + 10 > player.y - player.height / 2 + 10;
  const collidesLeft = self.x - self.width / 2 < player.x + player.width / 2;
  const collidesRight = self.x + self.width / 2 > player.x - player.width / 2;

  if (collidesTop && collidesLeft && collidesRight) {
    console.log('Collision Player');
    return results;
  }

}

Ball.prototype.collidedWithPlayerRight = function (player) {

  var self = this;
  var results = true;

  const collidesTop = self.y + self.height / 2 + 10 > player.y - player.height / 2 + 10;
  const collidesLeft = self.x - self.width / 2 < player.x + player.width / 2;
  const collidesRight = self.x + self.width / 2 > player.x - player.width / 2;
  const collidesBottom = self.y - self.height / 2 < player.y + player.height / 2;

  if (collidesTop && !collidesLeft && collidesRight && !collidesBottom) {
    console.log('Collision Player RIGHT');
    return results;
  }

}

Ball.prototype.collidedWithPlayerLeft = function (player) {

  var self = this;
  var results = true;

  const collidesTop = self.y + self.height / 2 + 10 > player.y - player.height / 2 + 10;
  const collidesLeft = self.x - self.width / 2 < player.x + player.width / 2;
  const collidesRight = self.x + self.width / 2 > player.x - player.width / 2;
  const collidesBottom = self.y - self.height / 2 < player.y + player.height / 2;

  if (collidesTop && collidesLeft && !collidesRight && !collidesBottom) {
    console.log('Collision Player RIGHT');
    return results;
  }

}

Ball.prototype.outOfArray = function () {
  var self = this;
  var results = true;

  if (self.y > self.canvas.height) {

    return results;
  }

}


Ball.prototype.update = function () {
  var self = this;

  self.y = self.y + self.directionY * self.speed;
  self.x = self.x + self.directionX * self.speed;

  // if (self.y < 0 + 2) {
  //   self.directionY = self.directionY * -1;
  // }

  // if (self.x === 0) {
  //   self.directionX = self.directionX * -1;
  // }

  // if (self.x < self.canvas.width - 2) {
  //   self.directionX = self.directionX * -1;
  // }


}

Ball.prototype.updateBeforeSpace = function () {
  var self = this;

  self.y = self.y + self.directionY * self.speed;
  self.x = self.x + self.directionX * self.speed;

  if (self.x < 0 + 52) {
    self.x = 0 + 52;
  }

  if (self.x > self.canvas.width - 52) {
    self.x = self.canvas.width - 52;
  }
  
}
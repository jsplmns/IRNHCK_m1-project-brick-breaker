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


Ball.prototype.update = function () {
  var self = this;

  self.y = self.y + self.directionY * self.speed;
  self.x = self.x + self.directionX * self.speed;

  if (self.y < 0 + 2) {
    self.directionY = self.directionY * -1;
  }

  if (self.x === 0) {
    self.directionX = self.directionX * -1;
  }

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
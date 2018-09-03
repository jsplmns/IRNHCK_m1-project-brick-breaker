'use strict';


function Player(canvas, lives) {
  var self = this;
  
  self.canvas = canvas;
  self.width = 100;
  self.height= 20;
  self.x = self.canvas.width / 2;
  self.y = self.canvas.height - 12;
  self.lives = lives;
  self.ctx = self.canvas.getContext('2d');
  self.direction = 0;
  self.speed = 5;
};

Player.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'black';
  self.ctx.fillRect(self.x - self.width / 2, self.y - self.height /2, self.width, self.height);

};

Player.prototype.setDirection = function (direction) {
  var self = this;

  self.direction = direction;
}


Player.prototype.update = function () {
  var self = this;

  self.x = self.x + self.direction * self.speed;

  if (self.x < 5 + self.width/2) {
    self.x = 0 + self.width/2 +5;
  }

  if (self.x > self.canvas.width - 5 - self.width/2) {
    self.x = self.canvas.width - self.width/2 -5;
  }

}
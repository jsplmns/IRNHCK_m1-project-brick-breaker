'use strict';


function Brick(canvas, width, x, y) {
  var self = this;
  
  self.canvas = canvas;
  self.width = width;
  self.height= width / 3;
  self.x = x;
  self.y = y;
  self.ctx = self.canvas.getContext('2d');
};

Brick.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = '#d1430c';
  self.ctx.fillRect(self.x - self.width / 2, self.y - self.height /2, self.width, self.height);

};

Brick.prototype.update = function () {
  var self = this;

  self.x = self.x;
}
'use strict';


function Walls(canvas, width, height, x, y) {
  var self = this;

  self.canvas = canvas;
  self.width = width;
  self.height= height;
  self.x = x;
  self.y = y;
  self.ctx = self.canvas.getContext('2d');
};

Walls.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = '#244b84';
  self.ctx.fillRect(self.x - self.width / 2, self.y - self.height /2, self.width, self.height);

};
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
  self.speed = 8;
};

Player.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'black';
  self.ctx.fillRect(self.x - self.width / 2, self.y - self.height /2, self.width, self.height);

  //  ------ DRAW COLLISION FIELDS ------
 
  var path = self.getLeftCollisionPath();
  self.ctx.strokeStyle = "black";
  self.ctx.stroke(path);

  var path = self.getRightCollisionPath();
  self.ctx.strokeStyle = "black";
  self.ctx.stroke(path);

  var path = self.getTopCollisionPath();
  self.ctx.strokeStyle = "black";
  self.ctx.stroke(path);

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

Player.prototype.getTopLeftCorner = function () {
  var self = this;

  return {x:self.x - self.width / 2, y:self.y - self.height /2};
};

Player.prototype.getBottomLeftCorner = function () {
  var self = this;

  return {x:self.x - self.width / 2, y:self.y + self.height /2};
};

Player.prototype.getTopRightCorner = function () {
  var self = this;

  return {x:self.x + self.width / 2, y:self.y - self.height /2};
};

Player.prototype.getBottomRightCorner = function () {
  var self = this;

  return {x:self.x + self.width / 2, y:self.y + self.height /2};
};



Player.prototype.getLeftCollisionPath = function () {
  var self = this;
  
  var extendBy = self.width / 10;
  var center = {x: self.x, y: self.y};
  var extendedTopLeft = extendSegment(center, self.getTopLeftCorner(), extendBy);
  var extendedBottomLeft = extendSegment(center, self.getBottomLeftCorner(), extendBy);
  
  return getTriangle(center, extendedBottomLeft, extendedTopLeft);
};

Player.prototype.getRightCollisionPath = function () {
  var self = this;
  
  var extendBy = self.width / 10;
  var center = {x: self.x, y: self.y};
  var extendedTopRight = extendSegment(center, self.getTopRightCorner(), extendBy);
  var extendedBottomRight = extendSegment(center, self.getBottomRightCorner(), extendBy);
  
  return getTriangle(center, extendedTopRight, extendedBottomRight);
}

Player.prototype.getTopCollisionPath = function () {
  var self = this;
  
  var extendBy = self.width / 10;
  var center = {x: self.x, y: self.y};
  var extendedTopLeft = extendSegment(center, self.getTopLeftCorner(), extendBy);
  var extendedTopRight = extendSegment(center, self.getTopRightCorner(), extendBy);

  return getTriangle(center, extendedTopRight, extendedTopLeft);

}

Player.prototype.getBounceDirection = function (point) {
  var self = this;

  var reverseX = {x: -1, y: 1};
  var reverseY = {x: 1, y: -1};
  // var reverseBoth = {x: -1, y: -1};


  var leftCollisionPath = self.getLeftCollisionPath();
  var rightCollisionPath = self.getRightCollisionPath();
  var topCollisionPath = self.getTopCollisionPath();


  if (self.ctx.isPointInPath(leftCollisionPath, point.x, point.y)) {
    return reverseX;
  } else if (self.ctx.isPointInPath(rightCollisionPath, point.x, point.y)) {
    return reverseX;
  } else if (self.ctx.isPointInPath(topCollisionPath, point.x, point.y)) {
    return reverseY;
  } 

}

function getTriangle(A, B, C) {
  var path = new Path2D();
  path.moveTo(A.x, A.y);
  path.lineTo(B.x, B.y);
  path.lineTo(C.x, C.y);
  path.closePath();
  return path;
}

function extendSegment(A, B, length) {
  var C = {};

  var lenAB = Math.sqrt(Math.pow(A.x - B.x, 2.0) + Math.pow(A.y - B.y, 2.0));
  C.x = B.x + (B.x - A.x) / lenAB * length;
  C.y = B.y + (B.y - A.y) / lenAB * length;

  return C;
}
'use strict';


function Brick(canvas, x, y, width, height,) {
  var self = this;
  
  self.canvas = canvas;
  self.width = width;
  self.height = height;
  self.x = x;
  self.y = y;
  self.ctx = self.canvas.getContext('2d');
};

Brick.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = '#d1430c';
  self.ctx.fillRect(self.x - self.width / 2, self.y - self.height /2, self.width, self.height);

 
//  ------ DRAW COLLISION FIELDS ------
 
  // var path = self.getLeftCollisionPath();
  // self.ctx.strokeStyle = "black";
  // self.ctx.stroke(path);

  // var path = self.getRightCollisionPath();
  // self.ctx.strokeStyle = "black";
  // self.ctx.stroke(path);

  // var path = self.getTopCollisionPath();
  // self.ctx.strokeStyle = "black";
  // self.ctx.stroke(path);

  // var path = self.getBottomCollisionPath();
  // self.ctx.strokeStyle = "black";
  // self.ctx.stroke(path);

};

Brick.prototype.update = function () {
  var self = this;
};


Brick.prototype.getTopLeftCorner = function () {
  var self = this;

  return {x:self.x - self.width / 2, y:self.y - self.height /2};
};

Brick.prototype.getBottomLeftCorner = function () {
  var self = this;

  return {x:self.x - self.width / 2, y:self.y + self.height /2};
};

Brick.prototype.getTopRightCorner = function () {
  var self = this;

  return {x:self.x + self.width / 2, y:self.y - self.height /2};
};

Brick.prototype.getBottomRightCorner = function () {
  var self = this;

  return {x:self.x + self.width / 2, y:self.y + self.height /2};
};

Brick.prototype.getLeftCollisionPath = function () {
  var self = this;
  
  var extendBy = self.width / 2;
  var center = {x: self.x, y: self.y};
  var extendedTopLeft = extendSegment(center, self.getTopLeftCorner(), extendBy);
  var extendedBottomLeft = extendSegment(center, self.getBottomLeftCorner(), extendBy);
  
  return getTriangle(center, extendedBottomLeft, extendedTopLeft);
};

Brick.prototype.getRightCollisionPath = function () {
  var self = this;
  
  var extendBy = self.width / 2;
  var center = {x: self.x, y: self.y};
  var extendedTopRight = extendSegment(center, self.getTopRightCorner(), extendBy);
  var extendedBottomRight = extendSegment(center, self.getBottomRightCorner(), extendBy);
  
  return getTriangle(center, extendedTopRight, extendedBottomRight);
};

Brick.prototype.getTopCollisionPath = function () {
  var self = this;
  
  var extendBy = self.width / 2;
  var center = {x: self.x, y: self.y};
  var extendedTopLeft = extendSegment(center, self.getTopLeftCorner(), extendBy);
  var extendedTopRight = extendSegment(center, self.getTopRightCorner(), extendBy);
  
  return getTriangle(center, extendedTopRight, extendedTopLeft);
};

Brick.prototype.getBottomCollisionPath = function () {
  var self = this;
  
  var extendBy = self.width / 2;
  var center = {x: self.x, y: self.y};
  var extendedBottomRight = extendSegment(center, self.getBottomRightCorner(), extendBy);
  var extendedBottomLeft = extendSegment(center, self.getBottomLeftCorner(), extendBy);
  
  return getTriangle(center, extendedBottomLeft, extendedBottomRight);
};

Brick.prototype.getBounceDirection = function (point) {
  var self = this;

  var reverseX = {x: -1, y: 1};
  var reverseY = {x: 1, y: -1};
  var reverseBoth = {x: -1, y: -1};


  var leftCollisionPath = self.getLeftCollisionPath();
  var rightCollisionPath = self.getRightCollisionPath();
  var topCollisionPath = self.getTopCollisionPath();
  var bottomCollisionPath = self.getBottomCollisionPath();

  console.log(

    'left', self.ctx.isPointInPath(leftCollisionPath, point.x, point.y),
    'right', self.ctx.isPointInPath(rightCollisionPath, point.x, point.y),
    'top', self.ctx.isPointInPath(topCollisionPath, point.x, point.y),
    'bottom', self.ctx.isPointInPath(bottomCollisionPath, point.x, point.y),

  );



  if (self.ctx.isPointInPath(topCollisionPath, point.x, point.y)) {
    return reverseY;
  } else if (self.ctx.isPointInPath(bottomCollisionPath, point.x, point.y)) {
    return reverseY;
  } else if (self.ctx.isPointInPath(leftCollisionPath, point.x, point.y)) {
    return reverseX;
  } else if (self.ctx.isPointInPath(rightCollisionPath, point.x, point.y)) {
    return reverseX;
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
# Project's name

## Description
Bricks in the upper third of the canvas have to be broken with a ball that bounces off walls and bricks. The player can control a pad that goes left and right on the bottom of the canvas. He can bounce off the ball in different angles depending on where the ball hits the pad.

### Winning / Losing Condition:
The player wins the game, if he manages to break all bricks.
The player loses lives, when the ball goes out on the bottom of the canvas and loses the game, once all lives have been deducted.


## MVP (DOM - CANVAS)
The MVP of the projects can start a game with one brick. The canvas is fully setup with borders on both sides and on the top. The player pad is fully setup with all different angle variables, from which the ball changes its direction.


## Backlog
- add more bricks
- add timer
- add bricks back in after some time
- add different bricks


## Data structure

#### Walls ()
##### Wall Left
self.x = 10  
self.y = canvas.height / 2  
self.size = canvas.height  

##### Wall Right
self.x = canvas.width -10  
self.y = canvas.height / 2  
self.size = canvas.height  

##### Wall Top
self.x = canvas.width / 2  
self.y = 10  
self.size = canvas.width  

#### Brick ()
self.x = canvas width / 2  
self.y = canvas height /4  

.draw()


#### Ball ()
self.x = canvas.width / 2  
self.y = canvas.height -20  
self.direction = x && y  
self.speed = speed

.colidedWithBrick
* self.direction = invert

.colidedWithWall
* self.direction = invert

.colidedWithPad
* checkPartOfPad
⋅⋅⋅* self.direction = setPadDirection

.setDirection()  
.update()  
.draw()  


#### Player ()
self.x = canvas.width / 2  
self.y = canvas.height -10  
self.direction = x +1 || x -1  
self.lives = lives

.update()  
.draw()  





## States & States Transitions
Definition of the different states and their transition (transition functions)

### Splash Page:
```html
<main>
⋅⋅⋅<div>
⋅⋅⋅⋅⋅⋅<h1></h1>
⋅⋅⋅⋅⋅⋅<button></button>
⋅⋅⋅</div>
</main>
```

### GAME Page:
```html
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
```

### gameOver Page:
```html
<main>
⋅⋅⋅<div>
⋅⋅⋅⋅⋅⋅<h1></h1>
⋅⋅⋅⋅⋅⋅<p><span></span></p>
⋅⋅⋅⋅⋅⋅<button></button>
⋅⋅⋅</div>
</main>
```

### gameOverWin Page:
```html
<main>
⋅⋅⋅<div>
⋅⋅⋅⋅⋅⋅<h1></h1>
⋅⋅⋅⋅⋅⋅<p><span></span></p>
⋅⋅⋅⋅⋅⋅<button></button>
⋅⋅⋅</div>
</main>
```


### LoadGame ()

### Start ()


## Task
Task definition in order of priority


## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
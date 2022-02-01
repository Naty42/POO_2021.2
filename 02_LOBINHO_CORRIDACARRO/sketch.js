class Entity{  
  constructor(x, y, step, img_car){
    this.x = x; 
    this.y = y; 
    this.step = step;
    this.img_car = img_car;
}
  
  draw(){
    image(this.img_car, this.x, this.y, this.step, this.step)
  }
}

class Board{
  constructor(nl, nc, step, background){
    this.nc = nc;
    this.nl = nl;
    this.step = step;
    this.background = background;
  }
  
  draw(){
    image(this.background, 0, 0, this.nl*this.step, this.nc*this.step);
  }
}

let board = Board;
let img_background;
let img_carU;
let img_carR;
let img_carL;
let img_carD;
let car = Entity;
let veloc = 3

function mover(){
  if (keyIsDown(LEFT_ARROW)){
    car.x-= veloc;
    car.img_car = img_carL;
  } if (keyIsDown(RIGHT_ARROW)){
    car.x+= veloc;
    car.img_car = img_carR;
  } if (keyIsDown(UP_ARROW)){
    car.y-= veloc;
    car.img_car = img_carU;
  } if (keyIsDown(DOWN_ARROW)){
    car.y+= veloc;
    car.img_car = img_carD;
  }
}

function setup() {
  textAlign(CENTER, CENTER);
  textSize(50);
  
  let size = 100;
  
  img_carU = loadImage('carUp.png');
  img_carR = loadImage('carRight.png');
  img_carL = loadImage('carLeft.png');
  img_carD = loadImage('carDown.png');
  img_background = loadImage('pista.webp');
 
  car = new Entity(50, 50, size, img_carR);
  board = new Board(5, 5, size, img_background);
  
  createCanvas(board.nc * size, board.nl * size);
}

function naofugir(){
  if(car.x >= 400){
    car.x = 400
  } else if (car.x <= 0 ){
  car.x = 0;
  } else if (car.y <= 0 ){
  car.y = 0
  } else if (car.y >= 400){
    car.y = 400;
  }
}

function draw() {  
  board.draw();
  car.draw();
  mover();
  naofugir();
}
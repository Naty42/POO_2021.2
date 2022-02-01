class Bolha{
  x;
  y;
  letter;
  speed;

  static radius = 20;
  alive = true;
  
  constructor(x, y, letter, speed){
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.speed = speed;
  }
  
  update(){
    this.y += this.speed;
  }

  draw(){
    fill(255)
    stroke(255)
    circle(this.x, this.y, 2 * Bolha.radius);
    fill(0);
    stroke(0);
    textSize(15);
    text(this.letter, this.x - 5, this.y + 5);
  }
}

class Quadro{
  bolhas = [];
  tempo = 100;
  temporizador = 0;

  constructor() {
    this.bolhas = [new Bolha (100, 100, "a", 1)];
    //this.bolhas.push(new Bolha (200, 100, "b", 2));
    //this.bolhas.push(new Bolha (300, 100, "c", 3));
  }

  update(){
    this.tempoBolha();
    this.bolhasFora();
    this.tirarBolhasMortas();
    
    for(let bolha of this.bolhas){
      bolha.update();
    }
  }

  tirarBolhasMortas(){
    //this.bolhas = this.bolhas.filter(b => b.alive);
    let vivas = [];
    for(let bolha of this.bolhas){
      if(bolha.alive){
        vivas.push(bolha);
      this.bolhas = vivas
      }
    }
  }

  removeByHit(code){
    for(let bolha of this.bolhas){
      if(bolha.letter[0].toUpperCase().charCodeAt(0) == code ){
        bolha.alive = false;
        break;
      }
    }
  }

  tempoBolha(){
    this.temporizador -= 1;
    if(this.temporizador <= 0){
      this.adicionarBolha();
      this.temporizador = this.tempo;
    }
  }

  bolhasFora(){
    for(let bolha of this.bolhas){
      if(bolha.y + 2 * Bolha.radius >= height){
        bolha.alive = false;
      }
    }
  }

  adicionarBolha(){
    let x = random(0, width - 2 * Bolha.radius);
    let y = -2 * Bolha.radius;
    let letter = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    let speed = random(1, 5);
    let bolha = new Bolha(x, y, letter, speed);
    this.bolhas.push(bolha);
  }

  draw(){
    stroke("black");
    fill("black");
    textSize(15);
    text("Você tem que matar todas.               Total na tela: " + this.bolhas.length, 5, 30); 
    
    for(let bolha of this.bolhas){
      bolha.draw();
    }
  } 
}

class Jogo{
  quadro;
  atualmente(){};
  
  constructor(){
    this.quadro = new Quadro();
    this.atualmente = this.jogar;
  }
  
  jogar(){
    this.quadro.update();
    background(255, 229, 204);
    this.quadro.draw();
    
    if(random(400) < 1){
       this.atualmente = this.perder;
       }
  }
  
  perder(){
    textAlign(CENTER, CENTER);
    background(153, 153, 255);
    fill(2);
    textSize(30);
    textWrap(WORD)
    text("Com o seu esforço, você acha que perdeu?", 100, 100, 200);
  }
}

let game;

function setup() {
  createCanvas(400, 400);
  frameRate(400);
  game = new Jogo();
}

function keyPressed(){
  game.quadro.removeByHit(keyCode)
}

function draw() {
  game.atualmente();
}
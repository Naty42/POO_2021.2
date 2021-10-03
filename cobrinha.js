const coluna = 8;
const linha = 8;

const lado = 50;
let x_cobra = 0;
let y_cobra = 0;

let vx_cobra = 0;
let vy_cobra = 0;

let time = 1;

let food_x = 0;
let food_y = 0;
let food_count = 0;

function pos_food(){
    food_x = parseInt(random(0, coluna));
    food_y = parseInt(random(0, linha));
}


function setup(){
    createCanvas(coluna * lado, linha * lado);
    frameRate(30);

    pos_food();
}

function draw_cel(x, y){
    noStroke();
    square(x * lado + 1, y * lado + 1, lado - 1, lado - 1, 100)
}

function draw_linhas_colunas(){
    fill(107,142,35);

    for(let c = 0; c < coluna; c++){
        for(let l = 0; l < linha; l++){
            draw_cel(c, l)
        }
    }
}

function nao_fugir(){
    if(x_cobra == coluna){
        x_cobra = 0
    }
    if(y_cobra == linha){
        y_cobra = 0
    }
    if(x_cobra == -1){
        x_cobra = coluna -1;
    }
    if(y_cobra == -1){
        y_cobra = linha -1
    }
}

function timer(){
    if(frameCount - time > 7){
        time = frameCount;
        x_cobra += vx_cobra;
        y_cobra += vy_cobra;
    }
}

function draw(){
    timer();
    nao_fugir();

    if(x_cobra == food_x && y_cobra == food_y){
        pos_food();
        food_count += 1
    }

    background(107,142,35);
    draw_linhas_colunas(); 

    fill(139,0,139)
    draw_cel(food_x, food_y);
    
    fill(250,128,114);
    draw_cel(x_cobra, y_cobra)

    fill(0);
    textSize(20);
    text(food_count, 10, 30)
}

function keyPressed(){
    if (keyCode === LEFT_ARROW){
        vx_cobra = -1
        vy_cobra = 0
    } else if (keyCode === RIGHT_ARROW){
        vx_cobra = 1
        vy_cobra = 0
    } else if (keyCode === UP_ARROW){
        vy_cobra = -1
        vx_cobra = 0
    } else if (keyCode === DOWN_ARROW){
        vy_cobra = 1
        vx_cobra = 0
    }
}
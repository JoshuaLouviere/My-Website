var canvas;
function setup() {
    let w = document.documentElement.clientWidth;
    canvas = createCanvas(w, 500);
    canvas.parent('#pong__container'); // Attach the canvas to the predefined div
    //canvas.style('z-index', "1900");
  /*  background(220);
    canvas.position(0, 0);
    */
    player1 = new object(9, 9, 25, 100);
    player1.color = "#fff";
}

function windowResized() {
    let w = document.documentElement.clientWidth;

    resizeCanvas(w, 500);
}
var player1;
var objects = [];

class object {
    constructor(x, y, w = 40, h = 40) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.color = 150;

        objects.push(this);
    }

    draw() {
        push();
        fill(this.color);
        rectMode(CENTER);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}

function drawDashedLine(amount) {
    for (let i = 0; i < amount; i++) {
        var h = height / (amount * 2);
        var y = i * (h + height / amount );
        rectMode(CENTER);
        rect(width / 2, y , h, h);
    }
}

function playerUpdate(delta) {
    var h = keyIsDown(83) - keyIsDown(87);

    player1.x = width / 2 - width / 2.4;

    if (h) { 
        player1.y += h * delta * 500;
    }

    if (player1.y - player1.h / 2 < 0) {
        player1.y = player1.h / 2;
    } else if (player1.y + player1.h / 2 > height) {
        player1.y = height - player1.h / 2;
    }
}


function drawAllObjects() {
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
}

function keyPressed() {
    /*console.log(keyCode);*/
}

function draw() {
    background(0);


    playerUpdate(deltaTime / 1000);

    // Draw
    drawDashedLine(30);
    drawAllObjects();
}
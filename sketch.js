var canvas;
var player1;
var player2;
var objects = [];
var ball;

var ballSpeed = [300, 299];
var bRangeY = [250, 350];

var lastLost = -1;
var playerSpeed = 500;

var scores = [];
var tut = [];

// ------------------------------------------------------------------------ //
//
//  Name:       ballSetup
//
//  Paramaters: N/A
//
// ------------------------------------------------------------------------ //
function ballSetup() {
    ball = new object(width / 2, height / 2, 20, 20);
    ball.vsp = ballSpeed[1];
    ball.hsp = ballSpeed[0];
    ball.color = '#fff';
    ball.paused = true;

}

var pause;

function pauseSetup() {
    pause = new object(width / 2, height / 2, 550, 125);
    pause.color = 50;
    pause.text = "< Press Enter To Start >";
}

// ------------------------------------------------------------------------ //
//
//  Name:       setup
//
//  Paramaters: N/A
//
// ------------------------------------------------------------------------ //
function setup() {
    let w = document.documentElement.clientWidth;
    canvas = createCanvas(w, 500);
    canvas.parent('#pong__container'); // Attach the canvas to the predefined div

    let y = 40;
    scores = [new object(width / 4, y, 100, 65), new object(width - width / 4, y, 100, 65)];
    scores[0].color = 0;
    scores[1].color = 0;
    scores[0].text = 0;
    scores[1].text = 0;

    player1 = new object(9, height / 2, 25, 100);
    player2 = new object(9, height / 2, 25, 100);
    player1.color = "#fff";
    player2.color = "#fff";
    ballSetup();
    pauseSetup();
    tut = [new object(player1.x, height / 3, 0, 0), new object(player1.x, height / 3, 0, 0)];
    tut[0].text = "<W>";
    tut[1].text = "<S>";

}

// ------------------------------------------------------------------------ //
//
//  Name:       windowResized
//
//  Paramaters: N/A
//
// ------------------------------------------------------------------------ //
function windowResized() {
    let w = document.documentElement.clientWidth;
    
    resizeCanvas(w, 500);
}

// ------------------------------------------------------------------------ //
//
//  Name: object
//
// ------------------------------------------------------------------------ //
class object {
    constructor(x, y, w = 40, h = 40) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.hsp = 0;
        this.vsp = 0;

        this.color = 150;

        this.text = "";
        this.visible = true;

        objects.push(this);
    }

    draw() {
        push();
        if (this.visible) {
            fill(this.color);
            rectMode(CENTER);
            noStroke();
            rect(this.x, this.y, this.w, this.h);

            fill(255);
            textAlign(CENTER, CENTER);
            textSize(50);

            text(this.text, this.x, this.y);
            pop();
        }
    }

    physics(dt) {
        this.x += this.hsp * dt;
        this.y += this.vsp * dt;
    }
}

// ------------------------------------------------------------------------ //
//
//  Name:       drawDashedLine
//
//  Paramaters: amount
//
// ------------------------------------------------------------------------ //
function drawDashedLine(amount) {
    for (let i = 0; i < amount; i++) {
        var h = height / (amount * 2);
        var y = i * (h + height / amount );
        rectMode(CENTER);
        rect(width / 2, y , h, h);
    }
}

// ------------------------------------------------------------------------ //
//
//  Name:       playerUpdate
//
//  Paramaters: delta
//
// ------------------------------------------------------------------------ //
function playerUpdate(delta) {
    tut[0].x = player1.x;
    tut[1].x = player1.x;
    tut[0].y = height / 4;
    tut[1].y = height - height / 4;
    scores[0].x = width / 4;
    scores[1].x = width - width / 4;
    var xOffset = 2.4;
    var h = keyIsDown(83) - keyIsDown(87);

    player1.x = width / 2 - width / xOffset;

  
    player1.vsp = h * playerSpeed;

    if (player1.y - player1.h / 2 < 0 && h < 0) {
        //player1.y = player1.h / 2;
        player1.vsp = 0;
    } else if (player1.y + player1.h / 2 > height && h > 0) {
       /* player1.y = height - player1.h / 2;*/
        player1.vsp = 0;
    }

     var dir = Math.sign(player2.y - ball.y);
    if (ball.paused == false) {

        if (ball.x > width / 2 && ball.hsp > 0) {

            player2.vsp = -dir * playerSpeed / 2;
        } else {
            player2.vsp = 0;
        }

    } else {
        player2.vsp = 0;
    }

        // Player 2 Movement ///////////////////////
        if (player2.y - player2.h / 2 < 0 && dir > 0) {
            player2.vsp = 0;
        } else if (player2.y + player2.h / 2 > height && dir < 0) {
            player2.vsp = 0;
        } 
/*    print(dir);*/
    player2.x = (width / 2) + width / xOffset;
}

// ------------------------------------------------------------------------ //
//
//  Name:       physicsAllObjects
//
//  Paramaters: dt
//
// ------------------------------------------------------------------------ //
function physicsAllObjects(dt) {
    for (let i = 0; i < objects.length; i++) {
        objects[i].physics(dt);
    }
}

function gameReset() {
    ball.paused = true;
    player1.y = height / 2;
}

function drawAllObjects() {
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
}

function objectCollision(obj0, obj1) {
    var left = obj0.x - obj0.w / 2 < obj1.x + obj1.w / 2;
    var right = obj0.x + obj0.w / 2 > obj1.x - obj1.w / 2;
    var top = obj0.y - obj0.h / 2 < obj1.y + obj1.h / 2;
    var bot = obj0.y + obj0.h / 2 > obj1.y - obj1.h / 2;

    if (left && right && top && bot) {
        return true;
    }

    return false;
}


function ballUpdate(dt) {
    if (ball.paused == false) { // Pause functionality

        for (var i = 0; i < tut.length; i++) {
            tut[i].visible = false;
        }
        var top = ball.y - ball.h / 2 < 0;
        var bottom = ball.y + ball.h / 2 > height;


        if (top || bottom) {
            if (top) {
                ball.y = ball.h / 2;
            } else if (bottom) {
                ball.y = height - ball.h / 2;
            }

            ball.vsp *= -1;

            var dir = Math.sign(ball.vsp);
            ball.vsp = random(bRangeY[0], bRangeY[1]) * dir;
        }


        if (objectCollision(ball, player1)) {

            ball.x = player1.x + player1.w / 2 + ball.w / 2;
            ball.hsp *= -1;
            var dir = Math.sign(ball.vsp);
            var pDir = Math.sign(player1.vsp);

            if (dir == 0) {
                dir = 1;
            }

            if (pDir) {
                ball.vsp = random(bRangeY[0], bRangeY[1]) * pDir;
                /*console.log(pDir);*/
            } else {

                ball.vsp = random(bRangeY[0], bRangeY[1]) * dir;
                // print("FDS");
            }

        }

        if (objectCollision(ball, player2)) {
            ball.x = player2.x - player2.w / 2 - ball.w / 2;
            ball.hsp *= -1;
            var dir = Math.sign(ball.vsp);
            var pDir = Math.sign(player2.vsp);

            if (dir == 0) {
                dir = 1;
            }

            if (pDir) {
                ball.vsp = random(bRangeY[0], bRangeY[1]) * pDir;
                //console.log(pDir);
            } else {

                ball.vsp = random(bRangeY[0], bRangeY[1]) * dir;
                // print("FDS");
            }

        }
        pause.visible = false;

        if (ball.x + ball.w / 2 < 0 || ball.x + ball.w / 2 > width) {
            gameReset();

            if (ball.x > width / 2) {
                scores[0].text += 1;
            } else {
                scores[1].text += 1;
            }
        }
    } else {
        ball.x = width / 2;
        ball.y = height / 2;
        ball.vsp = 0;
        ball.hsp = 0;
        player2.y = height / 2;
        for (var i = 0; i < tut.length; i++) {
            tut[i].visible = true;
        }
        pause.visible = true;
    }
}

function pauseUpdate() {
    pause.x = width / 2;
    pause.y = height / 2;
}

function keyPressed() {
    /*console.log(keyCode);*/
    if (keyCode == 13 && ball.paused) {
        ball.hsp = ballSpeed[0] * lastLost;
        ball.paused = false; 
    }
}

function draw() {
    background(0);


    playerUpdate(deltaTime / 1000);
    ballUpdate(deltaTime / 1000);
    pauseUpdate();

    physicsAllObjects(deltaTime / 1000);

    // Draw
    drawDashedLine(30);
    drawAllObjects();
}
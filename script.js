let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")
let name = prompt(`Enter Player's name:`)

const GameBoard = function (width,height) {
    this.width = width;
    this.height = height;
}

const Player = function (name,score =0){
    this.name = name;
    this.score = score;

    this.drawName = function (){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Player: " + `${this.name}`, canvas.width - 115, 20);
    }

    this.drawScore = function (){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + this.score, 8, 20);
    }

    this.increaseScore = function (){
        this.score++;
    }
}


const Ball = function (x= canvas.width / 2, y= canvas.height - 30, radius = 10 , speedBall= 10) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    // this.radian = radian;
    this.speedBall = speedBall;
    this.dx = 10;
    this.dy = -10;

    this.drawBall = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
};

const Paddles = function (paddleWidth=75, paddleHeight = 10){
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.paddleX = (canvas.width - this.paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;

    // Draw Paddle:
    this.drawPaddle = function (){
        ctx.beginPath();
        ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}


let ball = new Ball();
let paddle = new Paddles();
let player = new Player(name);

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);


function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        paddle.rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        paddle.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        paddle.rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        paddle.leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.paddleX = relativeX - paddle.paddleWidth / 2;
    } else {if(relativeX <= 0) paddle.paddleX = 0;
        if(relativeX >= canvas.width)  paddle.paddleX = canvas.width - paddle.paddleWidth;
    }
}



const main = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    player.drawName();
    player.drawScore();

    // Ball hit the wall
    if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0 ) ball.dx = -ball.dx;
    if (ball.y - ball.radius <= 0 ) ball.dy = -ball.dy
    // Paddle hit the ball
    if (ball.y+ball.radius >= canvas.height-paddle.paddleHeight) {
        if (ball.x > paddle.paddleX - ball.radius && ball.x < paddle.paddleX + paddle.paddleWidth + ball.radius) {
            player.increaseScore();
            ball.dy = -ball.dy;
        }
        else
            if(ball.y == canvas.height - ball.radius){
                document.location.reload();
                clearInterval(interval);
                alert("GAME OVER");
            }


    }
    //thực hiện bước nhảy
    ball.x += ball.dx;
    ball.y += ball.dy;


    if (paddle.rightPressed) {
        paddle.paddleX = Math.min(paddle.paddleX + 2, canvas.width - paddle.paddleWidth);
    } else if (paddle.leftPressed) {
        paddle.paddleX = Math.max(paddle.paddleX - 2, 0);
    }
};


const interval = setInterval(main,ball.speedBall);

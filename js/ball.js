function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.vy = 5;
    this.gravity = 2.5;
    this.lineWidth = 10;
    this.remove = false;

    this.generateColor = function () {
        return possibleColors[Math.floor(Math.random() * (possibleColors.length))];
    };

    this.color = this.generateColor();

    this.draw = function (canvasContext) {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        canvasContext.fillStyle  = this.color;
        canvasContext.fill();
        canvasContext.closePath();
    };

    this.onKeyPress = function () {
        if (keysDown[32]) {
            repositionRings();
            this.y -= this.vy;
        } else {
            if (this.y < gameCanvas.height - 100) {
                this.y += this.gravity;
            }
        }
    };

    this.getNewBallColor = function () {
        var newColor = this.generateColor();
        if (newColor != this.color) {
            this.color = newColor;
        } else {
            this.getNewBallColor();
        }
    };

    this.changeColor = function () {
        updateScore();
        this.getNewBallColor();
    };

    this.explode = function() {
        objectFactory.gameState = 'gameOver';
        objectFactory.previousScore = objectFactory.score;
        document.getElementsByTagName('canvas')[0].style.backgroundColor = 'black';
        bindGameOverEvents();
        explodeBall();
        playExplosion();
        resetScore();
    };
}
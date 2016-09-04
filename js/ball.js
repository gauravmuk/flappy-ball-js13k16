function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.vy = 10;
    this.gravity = 2.5;
    this.lineWidth = 10;

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

    this.onKeyPress = function (canvasH) {
        if (keysDown[32]) {
            this.y -= this.vy;
        } else {
            if (this.y < canvasH / 2) {
                this.y += this.gravity;
            }
        }
    };

    this.changeColor = function () {
        updateScore();
        while (this.generateColor() != this.color) {
            this.color = this.generateColor();
        }
    };

    this.explode = function() {
        resetScore();
        console.log('explode');
    };
}
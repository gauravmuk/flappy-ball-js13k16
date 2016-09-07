function ExplodedBall(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;

    this.direction = (Math.random() * 2 > 1) ? 1 : -1;

    this.vx = ~~(Math.random() * 10) * this.direction;
    this.vy = ~~(Math.random() * 15);

    this.draw = function (canvasContext) {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        canvasContext.fillStyle  = this.color;
        canvasContext.fill();
        canvasContext.closePath();
    };

    this.update = function () {
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.99;
        this.vy *= 0.99;

        this.vy += 0.25;
    };
}
function Ring(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.startAngle = 0;
    this.endAngle = Math.PI * 0.5;
    this.lineWidth = 10;
    this.currentAngle = 0;

    this.draw = function(canvasContext, modifier) {
        var circleStartAngle = this.startAngle + this.currentAngle;
        var circleEndAngle = this.endAngle + this.currentAngle;

        for (var i = 0, len = possibleColors.length; i < len; i++) {
            canvasContext.beginPath();
            canvasContext.arc(this.x, this.y, this.r, circleStartAngle + (Math.PI / 2 * i), circleEndAngle + (Math.PI / 2 * i), false);
            canvasContext.strokeStyle = possibleColors[i];
            canvasContext.lineWidth = this.lineWidth;
            canvasContext.stroke();
        }

        this.currentAngle += modifier;
        this.currentAngle %= 2 * Math.PI;
    };
}
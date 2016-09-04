function detectCollision() {
    var ball = objectFactory.ball;
    var ring = objectFactory.rings[0];

    if ((ball.y >= (ring.y - ring.r - ring.lineWidth / 2 - ball.r)) && (ball.y <= (ring.y - ring.r + ring.lineWidth / 2 + ball.r))) {
        var diffAngle = Math.atan(ball.r / ring.r);

        for (var i = 0; i < possibleColors.length; i++) {

            var startAngle = ring.startAngle + ring.currentAngle + (Math.PI / 2 * i);
            var endAngle = ring.endAngle + ring.currentAngle + (Math.PI / 2 * i);

            startAngle = startAngle > Math.PI * 2 ? startAngle - Math.PI * 2 : startAngle;
            endAngle = endAngle > Math.PI * 2 ? endAngle - Math.PI * 2 : endAngle;

            if (startAngle <= Math.PI * 1.5 - diffAngle && endAngle >= Math.PI * 1.5 + diffAngle) {
                if (possibleColors[i] === ball.color) {
                    ball.changeColor();
                } else {
                    ball.explode();
                }
            }
        }
    }
}
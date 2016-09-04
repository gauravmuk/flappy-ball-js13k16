function generateRings(gameCanvas, modifier) {
    var ctx = gameCanvas.getContext('2d');

    if (!objectFactory.rings.length) {
        objectFactory.rings.push(new Ring(gameCanvas.width / 2, gameCanvas.height / 2, 100));
    }

    objectFactory.rings[0].draw(ctx, modifier);
}

function levelGenerator(gameCanvas, modifier) {
    var canvasW = gameCanvas.width;
    var canvasH = gameCanvas.height;
    var ctx = gameCanvas.getContext('2d');

    if (!objectFactory.ball) {
        objectFactory.ball = new Ball(canvasW / 2, canvasH - 100);
    }
    objectFactory.ball.draw(ctx);
    objectFactory.ball.onKeyPress(canvasH);

    generateRings(gameCanvas, modifier);

    detectCollision();
}
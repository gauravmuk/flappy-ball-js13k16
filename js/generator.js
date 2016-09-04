var canvas;

function addMoreRings() {
    objectFactory.rings.push(new Ring(canvas.width / 2, objectFactory.rings[objectFactory.rings.length - 1].y + 300, 60));
}


function repositionRings() {
    for (var i = 0; i < objectFactory.rings.length; i++) {
        objectFactory.rings[i].y += 2.5;
    }

    if (objectFactory.ball.y < (canvas.height / 1.75)) {
        console.log('add');
        // addMoreRings();
    }
}

function drawRings(ctx, modifier) {
    for (var i = 0; i < objectFactory.rings.length; i++) {
        objectFactory.rings[i].draw(ctx, modifier);
    }
}

function generateRings(gameCanvas, modifier) {
    var ctx = gameCanvas.getContext('2d');

    if (!objectFactory.rings.length) {
        objectFactory.rings.push(new Ring(gameCanvas.width / 2, gameCanvas.height / 2, 100));
        objectFactory.rings.push(new Ring(gameCanvas.width / 2, gameCanvas.height / 2 - 350, 75));
    }

    drawRings(ctx, modifier);
}

function levelGenerator(gameCanvas, modifier) {
    canvas = gameCanvas;
    var canvasW = gameCanvas.width;
    var canvasH = gameCanvas.height;
    var ctx = gameCanvas.getContext('2d');

    if (!objectFactory.ball) {
        objectFactory.ball = new Ball(canvasW / 2, canvasH - 100);
    }
    objectFactory.ball.draw(ctx);
    objectFactory.ball.onKeyPress(canvasH);

    trackScore();
    generateRings(gameCanvas, modifier);

    detectCollision();
}
function repositionRings() {
    if (objectFactory.ball.y < gameCanvas.height / 2 + 100) {
        for (var i = 0; i < objectFactory.rings.length; i++) {
            objectFactory.rings[i].y += 5;
        }
    }
}

function appendMoreRings() {
    if (objectFactory.visibleBalls < 3) {
        for (var i = objectFactory.visibleBalls; i < 3; i++) {
            var aiFactor = Math.floor(Math.random() * 70) + 50;
            objectFactory.rings.push(new Ring(gameCanvas.width / 2, objectFactory.rings[objectFactory.rings.length - 1].y - aiFactor - 220, aiFactor));
        }
    }
}

function drawRings(ctx, modifier) {
    if (!objectFactory.ball) {
        return;
    }

    objectFactory.visibleBalls = 0;

    for (var i = 0; i < objectFactory.rings.length; i++) {
        objectFactory.rings[i].draw(ctx, modifier);

        if (objectFactory.rings[i].y <= objectFactory.ball.y) {
            objectFactory.visibleBalls++;
        }
    }
    appendMoreRings();
}

function generateRings(gameCanvas, modifier) {
    var ctx = gameCanvas.getContext('2d');

    if (!objectFactory.rings.length) {
        objectFactory.rings.push(new Ring(gameCanvas.width / 2, gameCanvas.height / 2, Math.floor(Math.random() * 70) + 50));
        objectFactory.rings.push(new Ring(gameCanvas.width / 2, gameCanvas.height / 2 - 300, Math.floor(Math.random() * 70) + 50));
    }

    drawRings(ctx, modifier);
}

function levelGenerator(gameCanvas, modifier) {
    var canvasW = gameCanvas.width;
    var canvasH = gameCanvas.height;
    var ctx = gameCanvas.getContext('2d');

    if (!objectFactory.ball && objectFactory.gameState !== 'gameOver') {
        resetScore();
        objectFactory.ball = new Ball(canvasW / 2, canvasH - 100);
    }

    if (objectFactory.gameState === 'gameOver') {
        delete objectFactory.ball;
        if (objectFactory.explodedBalls && objectFactory.explodedBalls.length) {
            for (var i = 0; i < objectFactory.explodedBalls.length; i++) {
                objectFactory.explodedBalls[i].draw(gameCanvas.getContext('2d'));
                objectFactory.explodedBalls[i].update();
            }
        }

        drawText('GAME', ctx, 0);
        drawText('OVER', ctx, 1);

        drawText('PRESS R', ctx, 3);
    }

    if (objectFactory.ball) {
        drawText(objectFactory.score, ctx, 0, 20, 20, 10);
        objectFactory.ball.draw(ctx);
        objectFactory.ball.onKeyPress(ctx);
    }

    if (objectFactory.gameState === 'playing') {
        generateRings(gameCanvas, modifier);
        detectCollision();
    }
}

function explodeBall() {
    objectFactory.explodedBalls = [];
    for (var i = 0; i < 50; i++) {
        objectFactory.explodedBalls.push(
            new ExplodedBall(
                objectFactory.ball.x,
                objectFactory.ball.y,
                objectFactory.ball.r / 2,
                possibleColors[Math.floor(Math.random() * (possibleColors.length))]
            )
        );
    }

    objectFactory.ball.remove = true;
}

function onPlayButtonClick() {
    objectFactory.gameState = 'playing';
}
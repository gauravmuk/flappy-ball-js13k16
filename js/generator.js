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
            objectFactory.rings.push(new Ring(gameCanvas.width / 2, objectFactory.rings[objectFactory.rings.length - 1].y - aiFactor - 210, aiFactor));
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
    if (!objectFactory.rings.length) {
        objectFactory.rings.push(new Ring(gameCanvas.width / 2, gameCanvas.height / 2, Math.floor(Math.random() * 70) + 50));
        objectFactory.rings.push(new Ring(gameCanvas.width / 2, gameCanvas.height / 2 - 300, Math.floor(Math.random() * 70) + 50));
    }

    drawRings(ctx, modifier);
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

function notStartedGameState() {
    drawText('FLAPPY', 0);
    drawText('BALL', 1);
    drawText('PLAY', 3, {color: '#4CE0D2'});
}

function playingGameState(modifier) {
    drawText(objectFactory.score, 0, {x: 20, y: 20, size: 10, color: 'black'});
    objectFactory.ball.draw(ctx);
    objectFactory.ball.onKeyPress(ctx);

    generateRings(gameCanvas, modifier);
    detectCollision();
}

function gameOverState() {
    objectFactory.ball = {};
    objectFactory.rings = [];
    if (objectFactory.explodedBalls && objectFactory.explodedBalls.length) {
        for (var i = 0; i < objectFactory.explodedBalls.length; i++) {
            objectFactory.explodedBalls[i].draw(gameCanvas.getContext('2d'));
            objectFactory.explodedBalls[i].update();
        }
    }

    drawText('GAME', 0, {color: '#FF3C38'});
    drawText('OVER', 1, {color: '#FF3C38'});
    drawText('RESTART', 3.5, {color: '#00B295'});
}

function gameStateHandler(modifier) {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    switch (objectFactory.gameState) {
        case 'notStarted':
            notStartedGameState();
            break;
        case 'playing':
            playingGameState(modifier);
            break;
        case 'gameOver':
            gameOverState();
            break;
    }
}
var keysDown = {};

function clickEventHandler() {
    if (objectFactory.cursor.x >= objectFactory.currentBtn.startX
        && objectFactory.cursor.x <= objectFactory.currentBtn.endX
        && objectFactory.cursor.y >= objectFactory.currentBtn.startY
        && objectFactory.cursor.y <= objectFactory.currentBtn.endY) {
        keysDown = {};
        objectFactory.rings = [];
        objectFactory.ball = new Ball(gameCanvas.width / 2, gameCanvas.height - 100);

        resetScore();

        objectFactory.gameState = 'playing';
        bindGamePlayingEvents();
    }
}

function mouseMoveHandler(e) {
    objectFactory.cursor.x = e.pageX - gameCanvas.offsetLeft;
    objectFactory.cursor.y = e.pageY - gameCanvas.offsetTop;
}

function bindNotStartedGameEvents() {
    addEventListener('mousemove', mouseMoveHandler);
    addEventListener('click', clickEventHandler);
}

function onJumpBall(e) {
    playBallJump();
    if (e.type === 'touchstart') {
        e.keyCode = 32;
    }
    keysDown[e.keyCode] = true;
}

function onGravitizeBall(e) {
    if (e.type === 'touchend') {
        e.keyCode = 32;
    }
    keysDown[e.keyCode] = false;
}

function bindGamePlayingEvents() {
    removeEventListener('mousemove', mouseMoveHandler);
    removeEventListener('click', clickEventHandler);

    addEventListener('keydown', onJumpBall);
    addEventListener('keyup', onGravitizeBall);
    addEventListener('touchstart', onJumpBall);
    addEventListener('touchend', onGravitizeBall);
}

function bindGameOverEvents() {
    removeEventListener('keydown', onJumpBall);
    removeEventListener('keyup', onGravitizeBall);
    removeEventListener('touchstart', onJumpBall);
    removeEventListener('touchend', onGravitizeBall);

    addEventListener('mousemove', mouseMoveHandler);
    addEventListener('click', clickEventHandler);
}

addEventListener('resize', function () {
    gameCanvas.height = window.innerHeight;
    gameCanvas.width = gameCanvas.height * 2 / 3;
});



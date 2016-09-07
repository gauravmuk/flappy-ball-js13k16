var scoreUpSound = jsfxr([3,,0.0492,0.3652,0.3894,0.8659,,,,,,0.2355,0.5761,,,,,,1,,,,,0.5]);
var explosionSound = jsfxr([3,,0.3708,0.5822,0.3851,0.0584,,-0.0268,,,,-0.0749,0.7624,,,,,,1,,,,,0.5]);
var ballJumpSound = jsfxr([2,,0.2157,,0.05,0.4632,,0.1288,,,,,,0.4423,,,,,0.4543,,,,,0.5]);

function playSound(url) {
    var player = new Audio();
    player.src = url;
    player.play();
}

function playScoreUp() {
    playSound(scoreUpSound);
}

function playExplosion() {
    playSound(explosionSound);
}

function playBallJump() {
    playSound(ballJumpSound);
}
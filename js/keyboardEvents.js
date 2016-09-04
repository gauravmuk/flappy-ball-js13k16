var keysDown = {};

window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
    keysDown[e.keyCode] = false;
});

// Hacking space bar as touch event
window.addEventListener('touchstart', function () {
    keysDown[32] = true;
});

window.addEventListener('touchend', function () {
    keysDown[32] = false;
});
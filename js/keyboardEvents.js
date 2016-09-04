var keysDown = {};

window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
    keysDown[e.keyCode] = false;
});
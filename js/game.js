(function () {
    var then;
    var w = window;
    var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    var gameCanvas = window.gameCanvas = document.createElement('canvas');
    window.ctx = gameCanvas.getContext('2d');

    gameCanvas.height = window.innerHeight;
    gameCanvas.width = gameCanvas.height * 2 / 3;

    document.body.appendChild(gameCanvas);

    var update = function (modifier) {
        gameStateHandler(modifier);
    };

    var main = function () {
      var now = Date.now();
      var delta = now - then;
      update (delta / 1000);

      then = now;
      requestAnimationFrame(main);
    };

    then = Date.now();

    main();
    bindNotStartedGameEvents();
})();
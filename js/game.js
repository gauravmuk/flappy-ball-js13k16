(function () {
    var then;
    var w = window;
    var requestAnimationFrame = w.requestAnimationFrame;

    var gameCanvas = document.createElement('canvas');
    var ctx = gameCanvas.getContext('2d');

    gameCanvas.width = 600;
    gameCanvas.height = 700;

    document.body.appendChild(gameCanvas);

    var update = function (modifier) {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        levelGenerator(gameCanvas, modifier);
    };

    var render = function () {

    };

    var main = function () {
      var now = Date.now();
      var delta = now - then;
      update (delta / 1000);
      render();

      then = now;
      requestAnimationFrame(main);
    };

    then = Date.now();

    main();
})();
(function () {
    var then;
    var w = window;
    var requestAnimationFrame = w.requestAnimationFrame;

    var gameCanvas = document.createElement('canvas');
    var ctx = gameCanvas.getContext('2d');

    gameCanvas.height = window.innerHeight;
    gameCanvas.width = gameCanvas.height * 2 / 3;

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
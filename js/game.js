(function () {
    var currentAngle = 0;

    var then;
    var w = window;
    var requestAnimationFrame = w.requestAnimationFrame;

    var gameCanvas = document.createElement('canvas');
    var ctx = gameCanvas.getContext('2d');

    gameCanvas.width = 600;
    gameCanvas.height = 700;

    document.body.appendChild(gameCanvas);

    var ring = {
        x: gameCanvas.width / 2,
        y: gameCanvas. height / 2 + 180,
        r: 100,
        startAngle: Math.PI / 2,
        endAngle: Math.PI,
        lineWidth: 12
    };

    var ringColors = ['#50C5B7', '#9CEC5B', '#6184D8', '#F0F465'];

    var ball = {
        x: gameCanvas.width / 2,
        y: gameCanvas. height / 2 + 180,
        r: 15,
        vy: 10,
        gravity: 2,
        bounceFactor: 7,
        color: ringColors[1]
    };

    var keysDown = {};

    addEventListener('keydown', function (e) {
        keysDown[e.keyCode] = true;
    });

    addEventListener('keyup', function (e) {
        keysDown[e.keyCode] = false;
    });

    var update = function (modifier) {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        var circleStartAngle = ring.startAngle + currentAngle;
        var circleEndAngle = ring.endAngle + currentAngle;

        // Write logic for going up

        if (keysDown[32]) {
            if (ball.y < 200) {
                ring.y += ball.gravity;
            }
            ball.y -= ball.vy;
        } else {
            if (ball.y < gameCanvas.height / 2) {
                ball.y += ball.gravity;
            }
        }

        for (var i = 0, len = ringColors.length; i < len; i++) {
            ctx.beginPath();
            ctx.arc(ring.x, ring.y, ring.r, circleStartAngle + (Math.PI / 2 * i), circleEndAngle + (Math.PI / 2 * i), false);
            ctx.strokeStyle = ringColors[i];
            ctx.lineWidth = ring.lineWidth;
            ctx.stroke();
        }

        for (i = 0, len = ringColors.length; i < len; i++) {
            ctx.beginPath();
            ctx.arc(ring.x, ring.y - 400, ring.r, circleStartAngle + (Math.PI / 2 * i), circleEndAngle + (Math.PI / 2 * i), false);
            ctx.strokeStyle = ringColors[i];
            ctx.lineWidth = ring.lineWidth;
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, false);
        ctx.fillStyle  = ball.color;
        ctx.fill();
        ctx.closePath();

        ctx.lineWidth = 10;
        ctx.strokeStyle = '#F0F465';
        ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

        currentAngle += modifier;
        currentAngle %= 2 * Math.PI;
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
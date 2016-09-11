var letters = letters = {
    'A': [
        [, 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1]
    ],
    'B': [
        [1, 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, 1]
    ],
    'E': [
        [1, 1, 1],
        [1],
        [1, 1, 1],
        [1],
        [1, 1, 1]
    ],
    'F': [
        [1, 1, 1],
        [1],
        [1, 1],
        [1],
        [1]
    ],
    'G': [
        [, 1, 1],
        [1],
        [1, , 1, 1],
        [1, , , 1],
        [, 1, 1]
    ],
    'L': [
        [1],
        [1],
        [1],
        [1],
        [1, 1, 1]
    ],
    'M': [
        [1, 1, 1, 1, 1],
        [1, , 1, , 1],
        [1, , 1, , 1],
        [1, , , , 1],
        [1, , , , 1]
    ],
    'O': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'P': [
        [1, 1, 1],
        [1, , 1],
        [1, 1, 1],
        [1],
        [1]
    ],
    'R': [
        [1, 1],
        [1, , 1],
        [1, , 1],
        [1, 1],
        [1, , 1]
    ],
    'S': [
        [1, 1, 1],
        [1],
        [1, 1, 1],
        [, , 1],
        [1, 1, 1]
    ],
    'T': [
        [1, 1, 1],
        [, 1],
        [, 1],
        [, 1],
        [, 1]
    ],
    'V': [
        [1, , , , 1],
        [1, , , , 1],
        [, 1, , 1],
        [, 1, , 1],
        [, , 1]
    ],
    'Y': [
        [1, , 1],
        [1, , 1],
        [, 1],
        [, 1],
        [, 1]
    ],
    '0': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    '1': [
        [, 1],
        [, 1],
        [, 1],
        [, 1],
        [, 1]
    ],
    '2': [
        [1,1,1],
        [,,1],
        [1,1,1],
        [1,,],
        [1,1,1]
    ],
    '3': [
        [1,1,1],
        [,,1],
        [,1,1],
        [,,1],
        [1,1,1]
    ],
    '4': [
        [1,,1,0],
        [1,,1,],
        [1,1,1,1],
        [,,1,],
        [,,1,],
    ],
    '5': [
        [1,1,1,0],
        [1,,,],
        [1,1,1,],
        [,,1],
        [1,1,1],
    ],
    '6': [
        [1,1,1,0],
        [1,,,],
        [1,1,1,],
        [1,,1],
        [1,1,1],
    ],
    '7': [
        [1,1,1],
        [,,1],
        [,,1],
        [,,1],
        [,,1],
    ],
    '8': [
        [1,1,1],
        [1,,1],
        [1,1,1],
        [1,,1],
        [1,1,1],
    ],
    '9': [
        [1,1,1],
        [1,,1],
        [1,1,1],
        [,,1],
        [1,1,1],
    ]
};

function drawText(string, lineNumber, params) {
    var needed = [];

    string = string.toString();
    for (var i = 0; i < string.length; i++) {
        var letter = letters[string.charAt(i)];
        if (letter) { // because there's letters I didn't do
            needed.push(letter);
        }
    }

    params = params || {};
    ctx.fillStyle = params.color || '#A6E1FA';

    var size = params.size || gameCanvas.width / 32;
    var currX = params.x || (gameCanvas.width - size * string.length * 4) / 2;

    if (string === 'PLAY' || string === 'RESTART') {
        objectFactory.currentBtn = {
            startX: currX,
            startY: params.y || gameCanvas.height / 4 + (lineNumber * size * 4) + (40 * lineNumber)
        };
    }

    for (i = 0; i < needed.length; i++) {
        letter = needed[i];
        var currY = params.y || gameCanvas.height / 4 + (lineNumber * size * 4) + (40 * lineNumber);
        var addX = 0;
        for (var y = 0; y < letter.length; y++) {
            var row = letter[y];
            for (var x = 0; x < row.length; x++) {
                if (row[x]) {
                    ctx.fillRect(currX + x * size, currY, size, size);
                }
            }
            addX = Math.max(addX, row.length * size);
            currY += size;
        }
        currX += size + addX;
    }

    if (string === 'PLAY' || string === 'RESTART') {
        objectFactory.currentBtn.endX = currX;
        objectFactory.currentBtn.endY = currY;
    }
}
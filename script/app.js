document.addEventListener('DOMContentLoaded', function () {
    var board = document.getElementById('board');
    var number = document.getElementById('number');
    var value = document.getElementById('value');
    var cellSize = parseInt(prompt('set cell size'));
    var boardSize = parseInt(prompt('set board size (cells per side)'));
    var cellsNumber = boardSize * boardSize;
    board.style.width = boardSize * cellSize + 'px';
    board.style.height = boardSize * cellSize + 'px';
    var cells = [];
    var initializeBoard = function () {
        for (var i = 0; i < cellsNumber; i++) {
            var cell = document.createElement('div');
            cell.style.width = cellSize + 'px';
            cell.style.height = cellSize + 'px';
            board.appendChild(cell);
            cells.push(cell);
        };
    };
    initializeBoard();
    cells.forEach(function (cell) {
        cell.addEventListener('click', function (event) {
            this.classList.toggle('live');
            console.log(this.style.width);
        });
    });
    var ant = null;
    var initializeAnt = function () {
        ant = document.createElement('div');
        ant.id = 'ant';
        board.appendChild(ant);
        ant.style.width = cellSize + 'px';
        ant.style.height = cellSize + 'px';
        ant.style.left = Math.floor(boardSize * cellSize / 20) * 10 + 'px';
        ant.style.top = Math.floor(boardSize * cellSize / 20) * 10 + 'px';
        ant.dataset.direction = 0;
    };
    initializeAnt();
    var getIndexFromCoordinates = function (array) {
        return array[1] / cellSize * boardSize + array[0] / cellSize;
    };
    var checkAntOnBoard = function () {
        return parseInt(ant.style.left) >= 0 && parseInt(ant.style.left) < boardSize * cellSize && parseInt(ant.style.top) >= 0 && parseInt(ant.style.top) < boardSize * cellSize;
    };
    var getAntsPosition = function () {
        return [parseInt(ant.style.left), parseInt(ant.style.top)];
    };
    var getBaseCell = function () {
        var antsPosition = getAntsPosition();
        var index = getIndexFromCoordinates(antsPosition);
        return cells[index]
    };
    var getTopMove = function (baseCell) {
        var antsDirection = parseInt(ant.dataset.direction);
        return (antsDirection % 2 !== 0) * Math.pow((-1), (antsDirection == 1)) * Math.pow((-1), (baseCell.className == 'live'));
    };
    var getTurn = function (baseCell) {
        return 2 * (baseCell.className == 'live') - 1;
    };
    var getLeftMove = function (baseCell) {
        var antsDirection = parseInt(ant.dataset.direction);
        return (antsDirection % 2 !== 1) * Math.pow((-1), (baseCell.className == 'live')) * Math.pow((-1), (antsDirection == 0));
    };
    var moveAnt = function () {
        //Function immediatelly gives final result:
        //        while (checkAntOnBoard()==1) {
        var baseCell = getBaseCell()
            , antsTopPosition = ant.style.top
            , antsLeftPosition = ant.style.left
            , topMove = getTopMove(baseCell)
            , leftMove = getLeftMove(baseCell)
            , turn = getTurn(baseCell);
        /*The ant always stays in board:
            ant.style.top = (boardSize * cellSize + parseInt(antsTopPosition) + cellSize * topMove) % (boardSize * cellSize) + 'px';
        
            ant.style.left = (boardSize * cellSize + parseInt(antsLeftPosition) + cellSize * leftMove) % (boardSize * cellSize) + 'px';
            */
        //Play stops when ant leaves the board:
        ant.style.top = parseInt(antsTopPosition) + cellSize * topMove + 'px';
        ant.style.left = parseInt(antsLeftPosition) + cellSize * leftMove + 'px';
        ant.dataset.direction = (4 + parseInt(ant.dataset.direction) + turn) % 4;
        baseCell.classList.toggle('live');
        //        }
    };
    var z = null;
    var play = document.getElementById('start');
    var pause = document.getElementById('pause');
    var clearBoard = document.getElementById('clearBoard');
    var resetAnt = document.getElementById('resetAnt');
    play.addEventListener('click', function (event) {
        z = setInterval(function () {
            if (checkAntOnBoard() == 1) {
                moveAnt()
            }
            else clearInterval(z)
        }, 100);
    });
    pause.addEventListener('click', function () {
        clearInterval(z);
    });
    resetAnt.addEventListener('click', function () {
        board.removeChild(ant);
        initializeAnt();
    });
    clearBoard.addEventListener('click', function () {
        cells.forEach(function (cell) {
            cell.classList.remove('live');
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var board = document.getElementById('board');
    var number = document.getElementById('number');
    var value = document.getElementById('value');
    var initializeBoard = function () {
        for (var i = 0; i < 100; i++) {
            var cell = document.createElement('div');
            board.appendChild(cell);
        };
    };
    initializeBoard();
    var cells = document.querySelectorAll('#board div');
    cells.forEach(function (cell) {
        cell.addEventListener('click', function (event) {
            this.classList.toggle('live');
        });
    });
    var initializeAnt = function () {
        var ant = document.createElement('div');
        ant.id = 'ant';
        board.appendChild(ant);
        ant.style.left = '40px';
        ant.style.top = '40px';
        ant.dataset.direction = 0;
    };
    initializeAnt();
    var directionTop, directionRight, directionBottom, directionLeft;
    var topMove = null
        , leftMove = null;
    var getIndexFromCoordinates = function (array) {
        return array[1] / 10 * 10 + array[0] / 10;
    };
    var getAntsPosition = function () {
        return [parseInt(ant.style.left), parseInt(ant.style.top)];
    };
    var toggleState = function (array) {
        var antsPosition = getAntsPosition();
        var index = getIndexFromCoordinates(antsPosition);
        cells[index].classList.toggle('live');
    };
    var getBaseCell = function () {
        var antsPosition = getAntsPosition();
        var index = getIndexFromCoordinates(antsPosition);
        return cells[index]
    };
    var getTopMove = function () {
        var antsDirection = parseInt(ant.dataset.direction);
        var baseCell = getBaseCell();
        if (antsDirection % 2 == 0) {
            return 0;
        }
        else if (antsDirection == 1) {
            if (baseCell.className == 'live') {
                return 1;
            }
            else {
                return -1;
            }
        }
        else {
            if (baseCell.className == 'live') {
                return -1;
            }
            else {
                return 1;
            }
        };
    };
    var getTurn = function () {
        var baseCell = getBaseCell();
        return 2 * (baseCell.className == 'live') - 1;
    };
    var getLeftMove = function () {
        var antsDirection = parseInt(ant.dataset.direction);
        var baseCell = getBaseCell();
        if (antsDirection % 2 == 1) {
            return 0;
        }
        else if (antsDirection == 0) {
            if (baseCell.className == 'live') {
                return 1;
            }
            else {
                return -1;
            }
        }
        else {
            if (baseCell.className == 'live') {
                return -1;
            }
            else {
                return 1;
            }
        };
    };
     
    var calculateValue = function(){
        var cellsValues = [0,0,0,0,0,0,0,0,0,0];
        for(var j = 0; j < 10; j++) {
        for (var i = 0; i < 10; i++) {
            if (cells[j*10+i].className == 'live') {
                cellsValues[j] += 1;
            }
            cellsValues[j].push(cells[j*10+i])
        }
    };
        return cellsValues;
    };
    
    var moveAnt = function () {
        var baseCell = getBaseCell();
        var antsTopPosition = ant.style.top;
        var antsLeftPosition = ant.style.left;
        var topMove = getTopMove()
            , leftMove = getLeftMove()
            , turn = getTurn();
        ant.style.top = (100 + parseInt(antsTopPosition) + 10 * topMove)%100 + 'px';
        ant.style.left = (100 + parseInt(antsLeftPosition) + 10 * leftMove)%100 + 'px';
        ant.dataset.direction = (4 + parseInt(ant.dataset.direction) + turn) % 4;
        baseCell.classList.toggle('live');
        var colValue = calculateColValue();
        number.innerHTML = colValue;
    };
    
    var z = null;
    var play = document.getElementById('start');
    var pause = document.getElementById('pause');
    play.addEventListener('click', function (event) {
        z = setInterval(function () {
            moveAnt()
        }, 100);
    });
    pause.addEventListener('click', function () {
        clearInterval(z);
        
    });
    var log = [];
    var calculateColValue = function(){
        var value = 0;
        var colValues = [0,0,0,0,0,0,0,0,0,0];
        for(var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (cells[i*10+j].className == 'live') {
                colValues[j] += 1;
                value += 1;
                log.push(value);
            }
            
        }
    };
        return colValues;
    };
    
    
    
    
});
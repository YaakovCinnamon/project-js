document.addEventListener("DOMContentLoaded", function() {
    
    //declare variables
    const boardSize = 10;
    const baseGuesses = 20;

    let remainingGuesses;
    let currentStage = 1;
    let ships = [];

    const board = document.getElementById("game-board");

    const stages = [
        [{ length: 4 }],
        [{ length: 4 }, { length: 3 }],
        [{ length: 4 }, { length: 3 }, { length: 2 }]
    ];

    let pageMessage = document.getElementById("message");


    // אתחול המשחק בהתחלה
    initializeGame();

    function showMessage(message){
        pageMessage.textContent = message;
        pageMessage.style.display = 'block';

        setTimeout(function() {
            pageMessage.textContent = "";
            pageMessage.style.display = 'none';
        }, 4000)
    }


    // פונקציה שמאתחלת את המשחק
    function initializeGame() {
        board.innerHTML = '';
        remainingGuesses = baseGuesses + (currentStage - 1) * 4;
        ships = [];
        createBoard();
        stages[currentStage - 1].forEach(ship => addShip(ship.length));
        updateGuessCounter();
    }

    // יצירת לוח המשחק
    function createBoard() {
        for (let i = 0; i < boardSize; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement("td");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", handleCellClick);
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    // פונקציה להוספת אונייה
    function addShip(length) {
        let shipCells = [];
        let direction = Math.floor(Math.random() * 3); // 0: אופקי , 1: אנכי, 2: אלכסוני
        let startRow, startCol;
        let valid = false;

        while (!valid) {
            shipCells = [];
            if (direction === 0) { // אופקי
                startRow = Math.floor(Math.random() * boardSize);
                startCol = Math.floor(Math.random() * (boardSize - length));
                for (let i = 0; i < length; i++) {
                    shipCells.push([startRow, startCol + i]);
                }
            } else if (direction === 1) { // אנכי
                startRow = Math.floor(Math.random() * (boardSize - length));
                startCol = Math.floor(Math.random() * boardSize);
                for (let i = 0; i < length; i++) {
                    shipCells.push([startRow + i, startCol]);
                }
            } else { // אלכסוני
                startRow = Math.floor(Math.random() * (boardSize - length));
                startCol = Math.floor(Math.random() * (boardSize - length));
                for (let i = 0; i < length; i++) {
                    shipCells.push([startRow + i, startCol + i]);
                }
            }

            // בדיקה שאין חפיפות עם האוניות הקיימות
            valid = true;
            for (let i = 0; i < shipCells.length; i++) {
                const cell = shipCells[i];
                console.log(cell);
                console.log(ships.length)
                for (let j = 0; j < ships.length; j++) {
                    console.log('enter'+cell)
                    const ship = ships[j];
                    for (let k = 0; k < ship.length; k++) {
                        const shipCell = ship[k];
                        if (shipCell[0] === cell[0] && shipCell[1] === cell[1]) {
                            valid = false;
                            break;
                        }
                    }
                    if (!valid) break;
                }
                if (!valid) break;
            }
        }

        ships.push(shipCells);
    }

    // בדיקה אם כל האוניות נמצאו
    function allShipsSunk() {
        for (let i = 0; i < ships.length; i++) {
            const ship = ships[i];
            for (let j = 0; j < ship.length; j++) {
                const cell = ship[j];
                const row = cell[0];
                const col = cell[1];
                const cellElement = board.querySelector(`td[data-row='${row}'][data-col='${col}']`);
                if (!cellElement.classList.contains("hit")) {
                return false;
                }
            }
        }
        return true;
    }

    // עדכון מונה הניחושים
    function updateGuessCounter() {
        const guessCounter = document.getElementById("guess-counter");
        if (guessCounter) {
            guessCounter.textContent = `ניחושים שנותרו: ${remainingGuesses}`;
        }
    }

    // טיפול בלחיצה על תא בלוח
    function handleCellClick(event) {
        

        if (remainingGuesses <= 0) {
            showMessage("משחק חוזר, לא נשארו לך ניחושים");
            currentStage = 1; // חזרה לשלב הראשון
            initializeGame();
            return;
        }

        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        let isHit = false;

        for (let i = 0; i < ships.length; i++) {
            const ship = ships[i];
            for (let j = 0; j < ship.length; j++) {
                const cell = ship[j];
                if (cell[0] === row && cell[1] === col) {
                isHit = true;
                break;
                }
            }
            if (isHit) break;
        }

        if (isHit) {
            event.target.classList.add("hit");
            if (allShipsSunk()) {
                if (currentStage < stages.length) {
                    showMessage(`שלב ${currentStage} הושלם! עוברים לשלב ${currentStage + 1}.`);
                    currentStage++;
                } else {
                    showMessage("מזל טוב, גמרת את המשחק!");
                    currentStage = 1; // התחלה מחדש מהשלב הראשון
                }
                initializeGame();
            }
        } else {
            event.target.classList.add("miss");
            remainingGuesses--; // ספירת ניחוש רק אם הוא טעות
            updateGuessCounter();
            if (remainingGuesses <= 0) {
                //alert("סוף המשחק! לא נשארו לך ניחושים.");
                showMessage("סוף המשחק! לא נשארו לך ניחושים.");
                currentStage = 1; // חזרה לשלב הראשון
                initializeGame();
            }
        }
    }

    

});
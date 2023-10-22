document.addEventListener("DOMContentLoaded", function () {
    let currentPlayer = "X";
    let isGameActive = true;
    let startCells = ["", "", "", "", "", "", "", "", ""];
    const squares = document.querySelectorAll("#board > div"); //access all div's
    const restartBtn= document.querySelector('.btn');// acsess to restart button 

    const winningCombinations = [
        //combination of possible winners
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];


    squares.forEach(function (square, index) {
        //assigning a id to each div
        square.classList.add("square");
        square.setAttribute("id", index.toString());

        //chaging colour of square to meet hover requirements 
        square.addEventListener('mouseover', function(e) {
            square.classList.add('hover');
        });
        square.addEventListener('mouseout', function(e) {
            square.classList.remove('hover');
        });

        square.addEventListener('click', addGo);
    });


    function addGo(e) {
        const square = e.target;
        const indexSquare = parseInt(square.getAttribute("id"));
        
        // checking to see if an X or O can be added to a square 
        if (startCells[indexSquare] === "" && isGameActive) {
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);
            startCells[indexSquare] = currentPlayer;

            if (checkOutcome()) {
                isGameActive = false;
                //console.log(currentPlayer + " wins!");
                let mystatus = document.getElementById("status"); 
                mystatus.innerHTML = "Congratulations! " +currentPlayer +" is the Winner!";
            } else if (!startCells.includes("")) {
                isGameActive = false;
                //console.log("Di game block");
            } else {
                // toggle between X and O
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkOutcome() {
        // checking the array to see if there are any winning combos
        for (const condition of winningCombinations) {
            const [a, b, c] = condition;
            if (startCells[a] === startCells[b] && startCells[a] === startCells[c] && startCells[a] !== "") {
                return true;
            }
        }
        return false;
    }

    restartBtn.addEventListener('click', restart);

    function restart(){
        console.log("restarting")
        isGameActive=true;
        currentPlayer="X";
        startCells = ["", "", "", "", "", "", "", "", ""];
        let mystatus = document.getElementById("status"); 
        mystatus.innerHTML = "Move your mouse over a square and click to play an X or an O.";
        //document.querySelectorAll("#board > div").forEach(square=>square.innerHTML="");
        
        squares.forEach(function(square,index){
            square.innerText = "";
            //square.classList.remove("square");
            square.classList.remove("X", "O");
            square.classList.remove("hover");
            //square.removeAttribute("id", index.toString());
        });
    }

});

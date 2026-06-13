var board;
var playerO = 'O';
var playerX = 'X';
var currentPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    board =  [
        [' ', ' ', ' '], 
        [' ', ' ', ' '], 
        [' ', ' ', ' ']
    ]

    for (let r=0;r<3;r++){
        for (let c=0;c<3;c++){
            let tile =document.createElement('div');
            tile.id=r.toString() + "-" +c.toString();
            tile.classList.add('tile');
            if (r==0 || r==1) {
                tile.classList.add('horizontal-lines');
            }
            if (c==0 || c==1) {
                tile.classList.add('vertical-lines');
            }
            tile.addEventListener('click', setTile);
            document.getElementById('board').append(tile);
        }
    }        
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split('-');
    let r=parseInt(coords[0]);
    let c=parseInt(coords[1]);

    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currentPlayer;
    this.innerText=currentPlayer;    

    if (currentPlayer == playerO) {
        currentPlayer = playerX;
    } 

    else {
        currentPlayer = playerO;
    }

    checkWinner();
}

function checkWinner() {
    for (let r=0; r<3; r++) 
        {
        if (board[r][0] != ' ' && board[r][0] == board[r][1] && board[r][1] == board[r][2]) 
            {
            for (let i=0; i<3; i++) 
                {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add('winner');
                }
                gameOver = true;
                return;
            }
        }
    }


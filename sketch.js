var cols = 30
var rows = 16
var bombs = 99
var rightPressed = false;
// var slidersAlreadySetup = false;
var gameState;

function make2DArray(rows,cols){
  arr = new Array(rows)
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols)
  }
  return arr;
}

var board;

function setup() {
  createCanvas((cols*25)+1,(rows*25)+1)
  textAlign(CENTER, CENTER);
  board = make2DArray(cols,rows);
  tempArr = new Array(cols*rows);
  //creating 1d array for bombs
  var counter = 0;
  for (var i = 0; i < tempArr.length; i++) {
    counter++;
    tempArr[i] = (counter < bombs+1)
  }
  //shuffling bombs
  shuffle(tempArr, true);
  //assigning bombs to board
  counter = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      board[i][j] = new Tile(i,j,tempArr[counter]);
      counter++;
    }
  }

  //giving numbers to tiles
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if(board[i][j].isBomb == false){
        board[i][j].face = board[i][j].countBombsAround();
      }
    }
  }


  // if(slidersAlreadySetup == false){
  //   columnsSliders = createSlider(1, 50, 30); // min, max, start
  //   columnsSliders.position(0,400); // x and y
  //   columnsSliders.size(400, 20); // width and height
  //
  //   rowsSlider = createSlider(1, 50, 16);
  //   rowsSlider.position(0, 430);
  //   rowsSlider.size(400, 20);
  //
  //   bombsSlider = createSlider(0, 150, 99);
  //   bombsSlider.position(0, 460);
  //   bombsSlider.size(400, 20);
  //
  //   slidersAlreadySetup = true;
  // }
}

function draw() {
  background(100)
  if (rightPressed) {
    if(mouseX < (cols*25)+1 && mouseY < (rows*25)+1){
      var tile = board[int(mouseX/25)][int(mouseY/25)];
      if(tile.isFlagged){
        tile.isFlagged = false;
      }else if(tile.isRevealed == false){
        tile.isFlagged = true;
      }

    }
    rightPressed = false
  }
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      x = i*25
      y = j*25
      strokeWeight(1);

      if (board[i][j].isRevealed) {
        if (board[i][j].isBomb) {
          if(gameState == 0){
            fill(255, 0, 0)
          }else{
            fill(0, 255, 0)
          }
          stroke(0);
          rect(x, y, 25, 25);
          fill(0)
          textSize(20);
          text("☀", x+25/2, y+25/2);
        }else{
          fill(255)
          stroke(0);
          rect(x, y, 25, 25);
        }
        if (board[i][j].isBomb == false && board[i][j].face != 0) {
          switch (board[i][j].face) {
            case 1:
              fill(color('blue'))
              break;
            case 2:
              fill(color('green'))
              break;
            case 3:
              fill(color('red'))
              break;
            case 4:
              fill(color('navy'))
              break;
            case 5:
              fill(color('maroon'))
              break;
            case 6:
              fill(color('turquoise'))
              break;
            case 7:
              fill(color('black'))
              break;
            case 8:
              fill(color('gray'))
              break;
            default:
              fill(0)
              break;
          }
          noStroke();
          textStyle(BOLD);
          textSize(15);
          text(board[i][j].face, x+25/2, y+25/2);
        }
      }else if(board[i][j].isFlagged){
        fill(0)
        textSize(20);
        text("🚩", x+25/2, y+25/2);
      }else{
        fill(100)
        stroke(0);
        rect(x, y, 25, 25);
      }
    }
  }
}

function gameOver(){
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if(board[i][j].isBomb)
        board[i][j].isRevealed = true;
    }
  }
}

function checkWin(){
  var count = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if(board[i][j].isRevealed)
        count++;
    }
  }
  if (rows*cols - count == bombs) {
    gameState = 1;
    gameOver();
  }
}

function mouseReleased() {
  if(gameState == null){
    if(mouseButton === LEFT){
      if(mouseX < (cols*25)+1 && mouseY < (rows*25)+1){
        var tile = board[int(mouseX/25)][int(mouseY/25)];
        if(tile.isFlagged == false){
          if(tile.isBomb == true){
            gameState = 0;
            gameOver();
          }
          if(tile.face == 0){
            tile.revealPool();
          }
          tile.isRevealed = true;
        }
      }
    }
    if (mouseButton === CENTER) {
      if(mouseX < (cols*25)+1 && mouseY < (rows*25)+1){
        var tile = board[int(mouseX/25)][int(mouseY/25)];
        if(tile.isRevealed){
          if(tile.countFlagsAround() == tile.face){
            tile.revealNeighbors()
          }
        }
      }
    }
    if(mouseButton === RIGHT) {
      rightPressed = true;
    }
    checkWin()
    // prevent default
    return false;
  }else{
    gameState = null;
    setup();
  }
}

document.oncontextmenu = function() {
    return false;
}

var cols = 30
var rows = 16
var bombs = 50
var rightPressed = false;
var slidersAlreadySetup = false;
var rowsSlider, columnsSlider, bombsSlider, button;
var gameState;
var time = 0;
var flagged = 0;

function make2DArray(rows,cols){
  arr = new Array(rows)
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols)
  }
  return arr;
}

var board;




function setup() {

  if(slidersAlreadySetup == false){
    setInterval(timeIt, 1000);
    rowsSlider = createSlider(3, 35, 16);
    rowsSlider.size(300, 20);

    columnsSlider = createSlider(3, 76, 30); // min, max, start
    columnsSlider.size(300, 20); // width and height

    bombsSlider = createSlider(1, 300, 99);
    bombsSlider.size(300, 20);

    slidersAlreadySetup = true;
    button = createButton("Start!");

    button.mouseClicked(setup);
    button.size(100,40);

    button.style("font-family", "Bodoni");
    button.style("font-size", "25px");
  }
  time = 0;
  button.position(450, rowsSlider.value()*25+20);
  rowsSlider.position(10, (rowsSlider.value()*25)+30);
  columnsSlider.position(10,(rowsSlider.value()*25)+10); // x and y
  bombsSlider.position(10, (rowsSlider.value()*25)+50);

  cols = columnsSlider.value();
  rows = rowsSlider.value();
  bombs = bombsSlider.value();
  if(cols < 30){
    createCanvas((29*25)+1,(rows*25)+1+80)
  }else{
    createCanvas((cols*25)+1,(rows*25)+1+80)
  }
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
}

function draw() {
  background(170)
  textAlign(CENTER);
  if (rightPressed) {
    if(mouseX < (cols*25)+1 && mouseY < (rows*25)+1){
      var tile = board[int(mouseX/25)][int(mouseY/25)];
      if(tile.isFlagged){
        tile.isFlagged = false;
        flagged--;
      }else if(tile.isRevealed == false){
        tile.isFlagged = true;
        flagged++;
      }

    }
    rightPressed = false
    checkWin()
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
  noStroke();
  textStyle(BOLD);
  textAlign(LEFT);
  textSize(15);
  fill(0)
  text(columnsSlider.value() + ' Columns', columnsSlider.x * 2 + columnsSlider.width, columnsSlider.y + columnsSlider.height/1.5);
  text(rowsSlider.value() + ' Rows', rowsSlider.x * 2 + rowsSlider.width, rowsSlider.y + rowsSlider.height/1.5);
  text(bombsSlider.value() + ' Mines', bombsSlider.x * 2 + bombsSlider.width, bombsSlider.y + bombsSlider.height/1.5);
  text(time + '  🕔', 625, rowsSlider.y);
  text(flagged + '  🚩', 625, rowsSlider.y + rowsSlider.height);

}

function timeIt() {
  if(gameState == null){
    time++;
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
  var revealed = 0;
  var correctFlags = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if(board[i][j].isRevealed){
        revealed++;
      }
      if(board[i][j].isBomb && board[i][j].isFlagged){
        correctFlags++;
      }
    }
  }
  if (rows*cols - revealed == bombs || correctFlags == bombs) {
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

class Tile{
  constructor(x,y,hasBomb){
    this.x = x;
    this.y = y;
    this.isBomb = hasBomb;
    this.face = 0;
    this.isRevealed = false;
    this.isFlagged = false;
  }
  countBombsAround(){
    var count = 0;
    if(this.x != 0){
      if(board[this.x-1][this.y].isBomb){
        count++;
      }
    }
    if(this.x != cols-1){
      if(board[this.x+1][this.y].isBomb){
        count++;
      }
    }
    if(this.y != 0){
      if(board[this.x][this.y-1].isBomb){
        count++;
      }
    }
    if(this.y != rows-1){
      if(board[this.x][this.y+1].isBomb){
        count++;
      }
    }
    if (this.x != 0 && this.y != 0) {
      if(board[this.x-1][this.y-1].isBomb){
        count++;
      }
    }
    if (this.x != cols-1 && this.y != 0) {
      if(board[this.x+1][this.y-1].isBomb){
        count++;
      }
    }
    if (this.x != 0 && this.y != rows-1) {
      if(board[this.x-1][this.y+1].isBomb){
        count++;
      }
    }
    if (this.x != cols-1 && this.y != rows-1) {
      if(board[this.x+1][this.y+1].isBomb){
        count++;
      }
    }
    return count;
  }
  revealPool(){
    //console.log("revealNeighbors");
    if(this.face != 0 || this.isBomb || this.isFlagged){
      return
    }
    if(this.isRevealed == true){
      return
    }

    this.isRevealed = true

    if(this.x != 0){
      if(board[this.x-1][this.y].face != 0 && board[this.x-1][this.y].isFlagged == false){
        board[this.x-1][this.y].isRevealed = true;
      }
    }
    if(this.x != cols-1){
      if(board[this.x+1][this.y].face != 0 && board[this.x+1][this.y].isFlagged == false){
        board[this.x+1][this.y].isRevealed = true;
      }
    }
    if(this.y != 0){
      if(board[this.x][this.y-1].face != 0 && board[this.x][this.y-1].isFlagged == false){
        board[this.x][this.y-1].isRevealed = true;
      }
    }
    if(this.y != rows-1){
      if(board[this.x][this.y+1].face != 0 && board[this.x][this.y+1].isFlagged == false){
        board[this.x][this.y+1].isRevealed = true;
      }
    }
    if (this.x != 0 && this.y != 0) {
      if(board[this.x-1][this.y-1].face != 0 && board[this.x-1][this.y-1].isFlagged == false){
        board[this.x-1][this.y-1].isRevealed = true;
      }
    }
    if (this.x != cols-1 && this.y != 0) {
      if(board[this.x+1][this.y-1].face != 0 && board[this.x+1][this.y-1].isFlagged == false){
        board[this.x+1][this.y-1].isRevealed = true;
      }
    }
    if (this.x != 0 && this.y != rows-1) {
      if(board[this.x-1][this.y+1].face != 0 && board[this.x-1][this.y+1].isFlagged == false){
        board[this.x-1][this.y+1].isRevealed = true;
      }
    }
    if (this.x != cols-1 && this.y != rows-1) {
      if(board[this.x+1][this.y+1].face != 0 && board[this.x+1][this.y+1].isFlagged == false){
        board[this.x+1][this.y+1].isRevealed = true;
      }
    }

    if(this.x > 0){
      board[this.x-1][this.y].revealPool();
    }
    if(this.x < cols-1){
      board[this.x+1][this.y].revealPool();
    }
    if(this.y > 0){
      board[this.x][this.y-1].revealPool();
    }
    if(this.y < rows-1){
      board[this.x][this.y+1].revealPool();
    }
  }

  countFlagsAround(){
    var count = 0;

    if(this.x != 0){
      if(board[this.x-1][this.y].isFlagged == true){
        count++;
      }
    }
    if(this.x != cols-1){
      if(board[this.x+1][this.y].isFlagged == true){
        count++;
      }
    }
    if(this.y != 0){
      if(board[this.x][this.y-1].isFlagged == true){
        count++;
      }
    }
    if(this.y != rows-1){
      if(board[this.x][this.y+1].isFlagged == true){
        count++;
      }
    }
    if (this.x != 0 && this.y != 0) {
      if(board[this.x-1][this.y-1].isFlagged == true){
        count++;
      }
    }
    if (this.x != cols-1 && this.y != 0) {
      if(board[this.x+1][this.y-1].isFlagged == true){
        count++;
      }
    }
    if (this.x != 0 && this.y != rows-1) {
      if(board[this.x-1][this.y+1].isFlagged == true){
        count++;
      }
    }
    if (this.x != cols-1 && this.y != rows-1) {
      if(board[this.x+1][this.y+1].isFlagged == true){
        count++;
      }
    }

    return count;
  }

  revealNeighbors(){
    if(this.x != 0){
      var tile = board[this.x-1][this.y];
      if(tile.isFlagged == false){
        if(tile.isBomb){
          gameState = 0;
          gameOver();
        }else{
          if(tile.face == 0){
            tile.revealPool();
          }
          tile.isRevealed = true;
        }
      }
    }
    if(this.x != cols-1){
      var tile = board[this.x+1][this.y];
      if(tile.isFlagged == false){
        if(tile.isBomb){
          gameState = 0;
          gameOver();
        }else{
          if(tile.face == 0){
            tile.revealPool();
          }
          tile.isRevealed = true;
        }
      }
    }
    if(this.y != 0){
      var tile = board[this.x][this.y-1];
      if(tile.isFlagged == false){
        if(tile.isBomb){
          gameState = 0;
          gameOver();
        }else{
          if(tile.face == 0){
            tile.revealPool();
          }
          tile.isRevealed = true;
        }
      }
    }
    if(this.y != rows-1){
      var tile = board[this.x][this.y+1];
      if(tile.isFlagged == false){
        if(tile.isBomb){
          gameState = 0;
          gameOver();
        }else{
          if(tile.face == 0){
            tile.revealPool();
          }
          tile.isRevealed = true;
        }
      }
    }
    if (this.x != 0 && this.y != 0) {
      var tile = board[this.x-1][this.y-1];
      if(tile.isFlagged == false){
        if(tile.isBomb){
          gameState = 0;
          gameOver();
        }else{
          if(tile.face == 0){
            tile.revealPool();
          }
          tile.isRevealed = true;
        }
      }
    }
    if (this.x != cols-1 && this.y != 0) {
      var tile = board[this.x+1][this.y-1];
      if(tile.isFlagged == false){
        if(tile.isBomb){
          gameState = 0;
          gameOver();
        }else{
          if(tile.face == 0){
            tile.revealPool();
          }
          tile.isRevealed = true;
        }
      }
    }
    if (this.x != 0 && this.y != rows-1) {
      var tile = board[this.x-1][this.y+1];
      if(tile.isFlagged == false){
        if(tile.isBomb){
          gameState = 0;
          gameOver();
        }else{
          if(tile.face == 0){
            tile.revealPool();
          }
          tile.isRevealed = true;
        }
      }
    }
    if (this.x != cols-1 && this.y != rows-1) {
      var tile = board[this.x+1][this.y+1];
      if(tile.isFlagged == false){
        if(tile.isBomb){
          gameState = 0;
          gameOver();
        }else{
          if(tile.face == 0){
            tile.revealPool();
          }
          tile.isRevealed = true;
        }
      }
    }
  }
}

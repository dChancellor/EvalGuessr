const gameBoardReducer = async (fen) => {
  let fenMover = 0;
  let boardArray = [];
  while (boardArray.length < 64) {
    let currentFenCharacter = fen.charAt(fenMover);
    if (currentFenCharacter === '/') {
      fenMover++;
      currentFenCharacter = fen.charAt(fenMover);
    }
    if (currentFenCharacter.match(/\d/g)) {
      fenMover++;
      for (var i = currentFenCharacter; i > 0; i--) {
        boardArray = [...boardArray, ''];
      }
    } else {
      fenMover++;
      boardArray = [...boardArray, currentFenCharacter];
    }
  }
  let result = await new Promise((resolve) => {
    resolve(boardArray);
  });
  return result;
};

export default gameBoardReducer;

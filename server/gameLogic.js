var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

const gameFileLineCount = 121332;

const { Chess } = require('chess.js');
const chess = new Chess();

var stockfish = require('stockfish');
var id = 0;
let eval;
var stockfishes = [];
stockfishes[id] = stockfish();
stockfishes[id].postMessage('setoption name Contempt value 30');
stockfishes[id].postMessage('setoption name Skill Level value 20');
stockfishes[id].postMessage('isready');
stockfishes[id].onmessage = function (message) {
  if (message.includes('cp')) {
    const split = message.split(' ');
    const indexOfCP = split.findIndex((element) => element === 'cp');
    eval = split[indexOfCP + 1];
  }
};

const makeRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const findTotalMoves = async (pgn) => {
  const regex = /\d+\./g;
  let result = await new Promise((resolve) => {
    let totalMoves = pgn.match(regex).pop().slice(0, -1);
    resolve(totalMoves);
  });
  return result;
};

const randomizedGameShrinker = async ({ orignalTotalMoves, originalPGN }) => {
  let reducedMoveCounter = makeRandomNumber(orignalTotalMoves - 4);
  if(reducedMoveCounter < 9){
    reducedMoveCounter = 9;
  }
  const shrinkToMove = originalPGN.lastIndexOf(` ${reducedMoveCounter}.`);
  let newPgn = originalPGN.slice(0, shrinkToMove);
  let blackOrWhite = Math.random();
  if (blackOrWhite > 0.5) {
    //Black to Move
    newPgn = newPgn.slice(0, newPgn.lastIndexOf(' '));
  }
  let result = await new Promise((resolve) => {
    resolve(newPgn);
  });
  return result;
};

const findGame = async (gameId) => {
  var instream = fs.createReadStream('./lib/games.txt');
  var outstream = new stream();
  var rl = readline.createInterface(instream, outstream);
  let lineCounter = 1;
  let result = new Promise((resolve, reject) => {
    rl.on('line', function (line) {
      lineCounter++;
      if (lineCounter === gameId) {
        resolve(line);
        rl.close();
        rl.removeAllListeners();
      }
    });
  });
  return result;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const findEval = async (evaluationTime, fen) => {
  stockfishes[id].postMessage(`position fen ${fen}`);
  stockfishes[id].postMessage(`go movetime ${evaluationTime}`);
  await delay(evaluationTime + 1000);
  return eval;
};

const defineGames = async (evaluationTime, numberOfGames) => {
  let games = [];
  while (games.length < numberOfGames) {
    let newGame = {};
    newGame.originalPGN = await findGame(makeRandomNumber(gameFileLineCount));
    newGame.orignalTotalMoves = await findTotalMoves(newGame.originalPGN);
    if (newGame.orignalTotalMoves > 8) {
      newGame.pgn = await randomizedGameShrinker(newGame);
      chess.load_pgn(newGame.pgn);
      newGame.fen = chess.fen();
      newGame.eval = await findEval(evaluationTime, newGame.fen);
      newGame.lastMove = chess.history({ verbose: true })[
        chess.history().length - 1
      ];
      chess.turn() === 'w'
        ? (newGame.colorToMove = 'white')
        : (newGame.colorToMove = 'black');
      games = [...games, newGame];
    }
  }
  return games;
};

module.exports = createGame = async (userInputs) => {
  return (result = await defineGames(
    userInputs.evaluationTime,
    userInputs.numberOfGames
  ));
};

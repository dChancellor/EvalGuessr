var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

let fileLocation;

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
console.log('Please input file name to parse or exit to quit');

standard_input.on('data', function (data) {
  if (data === 'exit\n') {
    console.log('Exiting...');
    process.exit();
  } else {
    //The slice removes the new line created from user prompt
    parseLichessData(data.slice(0, data.length-1));
  }
});


//Takes lichess database file from https://database.lichess.org/ and removes everything but the game moves
const parseLichessData = (fileLocation) => {
  var instream = fs.createReadStream(`./${fileLocation}`);
  var outstream = new stream();
  var rl = readline.createInterface(instream, outstream);
    rl.on('line', function (line) {
      if (line.startsWith('1.')) {
        fs.appendFile('./games.txt', `\n${line}`, function (err) {
          if (err) return console.log(err);
        });
      }
    });
    rl.on('close', function(){
        console.log('File finished!');
        process.exit()
    })
};

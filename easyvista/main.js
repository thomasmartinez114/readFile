// var fs = require('fs');
// var movedInfo = [[]];

// function readTextFile() {
//     fs.readFile('./data/test.txt', 'utf-8', function(err, data) {
//         if (err) throw err;

//         // console.log(data);

//         // split the text in the file
//         for (var i = 0; i < 2; i++) {
//            data.split('\r\n')
//            console.log(data);
//         }
//         // console.log(arrayData);

//     });
// }

// console.log(readTextFile());

var fs = require('fs');
var text = fs.readFileSync('./data/test.txt').toString('utf-8');
var textByLine = text.split(';');

console.log(textByLine);
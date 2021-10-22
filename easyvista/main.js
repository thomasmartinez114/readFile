var fs = require('fs');
var movedInfo = [[]];

function readTextFile() {
    fs.readFile('./data/tickets.txt', 'utf-8', function(err, data) {
        if (err) throw err;

        // console.log(data);

        // split the text in the file
        var arrayData = data.split('\n');
        for (var i = 0; i < arrayData.length; i++) {
           for (var j = 0; j < arrayData.length; j++) {
               movedInfo.push(arrayData[i].split(';'));
           }
            // console.log('The data on the line', i+1, 'is: ', arrayData[i]);
        }

        console.log(arrayData);
        // console.log(`This is subarray 0 from ${arrayData[0]}`);

    });
}

console.log(readTextFile());

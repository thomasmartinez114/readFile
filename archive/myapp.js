// import the javascript fs module
var fs = require('fs');
var movedInfo = [];

fs.readFile('mydata.txt', 'utf8', function(err, data) {
    if (err) throw err;
    
    // console.log(data);
    
    //split the text in mydata.txt
    var arraydat = data.split('\n');
    for (var i = 0; i < arraydat.length; i++) {
         console.log("The data on line", i+1, "is:", arraydat[i]);
  
    }

})
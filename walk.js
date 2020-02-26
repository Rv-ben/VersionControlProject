//initializing path and fs
const path = require('path');
const fs = require('fs');
//joining path of directory rn only reads Documents and path has to be set
const directoryPath = path.join(__dirname, 'Documents');

fs.readdir(directoryPath, function (err, files) {
    //error checking
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        console.log(file); 
    });
});
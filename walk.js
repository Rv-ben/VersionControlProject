//initializing path and fs
const path = require('path');
const fs = require('fs');
//joining path of directory rn only reads Documents and path has to be set
const directoryPath = path.join(__dirname, 'Documents');

fileWalk(directoryPath);


function fileWalk(directoryPath){
fs.readdir(directoryPath, function (err, files) {
    //error checking
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    
    files.forEach(function (file) {
        if(files.isdirectory == true){
            fileWalk(file)
        }
        console.log(file); 
    });
});
}
//initializing path and fs
const path = require('path');
const fs = require('fs');
//joining path of directory rn only reads Documents and path has to be set
const directoryPath = path.join(__dirname);
var compute = require('./pathName')

module.exports= {
    walk: fileWalk
}

fileWalk(directoryPath);


function fileWalk(directoryPath){
    listofCal= []
fs.readdir(directoryPath, function (err, files) {
    //error checking
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    console.log(directoryPath)
    files.forEach(function (file) {
        if(fs.statSync(directoryPath+"/"+file).isDirectory()){
            fileWalk(directoryPath+"/"+file)
        }
        else listofCal.append(compute.calc(directoryPath,file)); 
    });
    return listofCal;
});
}
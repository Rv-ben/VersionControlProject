//initializing path and fs
const path = require('path');
const fs = require('fs');
//joining path of directory rn only reads Documents and path has to be set
var compute = require('./pathName')

module.exports= {
    walk: fileWalk
}


function fileWalk(directoryPath){
    listofCal= [];
    fs.readdir(directoryPath, function (err, files) {
    //error checking
        if (err) {
           return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            if(fs.statSync(directoryPath+"/"+file).isDirectory()){
                fileWalk(directoryPath+"/"+file)
            }
            else listofCal.push(compute.calc(directoryPath,file)); 
        });
        console.log(listofCal.toString())
    });
    return listofCal;
}
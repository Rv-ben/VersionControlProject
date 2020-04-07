//initializing path and fs
const path = require('path');
const fs = require('fs');
//joining path of directory rn only reads Documents and path has to be set
var compute = require('./pathName')
let date = new Date();
module.exports= {
    walk: fileWalk
}

//Walks a folder recursively 
function fileWalk(directoryPath){

    listofCal= [];
    
    //access the folder
    fs.readdir(directoryPath, function (err, files) {
        //error checking
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        fs.appendFile('Manifest.txt',"Directory: "+directoryPath+"\n" ,function(error){}) 
        fs.appendFile('Manifest.txt',"--------------------------------\n",function(error){})

        //For every folder or directory
        files.forEach(function (file) {
            //if is directory 
            if (fs.statSync(directoryPath + "/" + file).isDirectory()) {
                //walk
                fs.appendFile('Manifest.txt',"Directory :  "+file+"\n",function(error){})
                fileWalk(directoryPath + "/" + file);
            }
            //if not a dot file get calcs
            else if (!file.startsWith(".")) {
                fs.appendFile('Manifest.txt',file + "     " + compute.calc(directoryPath, file)+"\n",function(error){})
            }
        });
        fs.appendFile('Manifest.txt',"--------------------------------\n",function(error){})
        fs.appendFile('Manifest.txt',"\n\n",function(error){})
        fs.appendFile('Manifest.txt', date + "\n", function(error){}); 
    });
}
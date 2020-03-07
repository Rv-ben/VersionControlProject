//initializing path and fs
const path = require('path');
const fs = require('fs');
//joining path of directory rn only reads Documents and path has to be set
var compute = require('./pathName')

module.exports= {
    walk: fileWalk
}

//Walks a folder recursively 
async function fileWalk(directoryPath){
    listofCal= [];
    
    //access the folder
    fs.readdir(directoryPath, async function (err, files) {
        //error checking
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        console.log("Directory: "+directoryPath);
        console.log("-----------------------------");
        //For every folder or directory
        files.forEach(async function (file) {
            //if is directory 
            if (fs.statSync(directoryPath + "/" + file).isDirectory()) {
                //walk
                console.log("Directory :  "+file);
                fileWalk(directoryPath + "/" + file);
            }
            //if not a dot file get calcs
            else if (!file.startsWith(".")) {
                console.log(file + "     " + compute.calc(directoryPath, file));
            }
        });
        console.log("-----------------------------");
        console.log("\n\n");
    });
}
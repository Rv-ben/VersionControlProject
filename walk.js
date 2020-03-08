//initializing path and fs
const path = require('path');
const fs = require('fs');
//joining path of directory rn only reads Documents and path has to be set
var compute = require('./pathName')

module.exports= {
    walk: fileWalk,
    copy: cpy
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

        fs.appendFile('Manifest.txt',"Directory: "+directoryPath+"\n" ,function(error){}) 
        let rightNow = new Date();
        fs.appendFile('Manifest.txt', rightNow + "\n", function(error){});
        fs.appendFile('Manifest.txt',"--------------------------------\n",function(error){})

        //For every folder or directory
        files.forEach(async function (file) {
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
    });
}

function cpy(directoryPath){
    fs.readFile('Manifest.txt',function(err,data){
        fs.writeFile(directoryPath+"/Manifest.txt",data,function(err){})
    })
}
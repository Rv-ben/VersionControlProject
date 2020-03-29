function copyFile(targetFile, targetFolder){
    const fs = require('fs');
    // takes two arguements a file to copy and a destination to copy to
    // both arguements should be strings
    fs.copyFile(targetFile, targetFolder, (err) => {
        //if there is an error anywhere in the process display said error 
        if (err) throw err;
      });
}
/////////////////////////////////////////////////////////////////////////////
//modify walk to copy files over to the new location
//once in new file walk again but regularly to rename all files with new artifact id


//initializing path and fs
const path = require('path');
const fs = require('fs');
//joining path of directory rn only reads Documents and path has to be set
var compute = require('./pathName')

module.exports= {
    walk: fileWalk
}

//Walks a folder recursively 
async function fileWalkCopy(directoryPath, target){
    listofCal= [];
    
    //access the folder
    fs.readdir(directoryPath, async function (err, files) {
        //error checking
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        //fs.appendFile('Manifest.txt',"Directory: "+directoryPath+"\n" ,function(error){}) 
        //fs.appendFile('Manifest.txt',"--------------------------------\n",function(error){})

        //For every folder or directory
        files.forEach(async function (file) {
            //if is directory 
            if (fs.statSync(directoryPath + "/" + file).isDirectory()) {
              copyFile(file,target);
                //walk
                //fs.appendFile('Manifest.txt',"Directory :  "+file+"\n",function(error){})
                //fileWalk(directoryPath + "/" + file);

            }
            //if not a dot file get calcs
            else if (!file.startsWith(".")) {
              copyFile(file,target);

                //fs.appendFile('Manifest.txt',file + "     " + compute.calc(directoryPath, file)+"\n",function(error){})
            }
        });
        //fs.appendFile('Manifest.txt',"--------------------------------\n",function(error){})
        //fs.appendFile('Manifest.txt',"\n\n",function(error){})
    });
}
//////////////////////////////////////////////////////////////////////////
// still need to get a search method to find what manifest to use 
// pass manifest top level path to the new walk method 
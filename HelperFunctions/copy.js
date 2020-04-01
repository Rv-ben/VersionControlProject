function copyFile(targetFile, targetFolder){
    const fs = require('fs');
    // takes two arguements a file to copy and a destination to copy to
    // both arguements should be strings
    fs.copyFile(targetFile, targetFolder, (err) => {
        //if there is an error anywhere in the process display said error 
        if (err) throw err;
      });
}


function copyFolder(folderToCopy, whereTo, folderName){
    const fs = require('fs-extra');
    //takes two arguements the folder in the current directory and the new folder to add it to
    fs.copy(folderToCopy, whereTo+'/'+ folderName, err =>{
      if(err) return console.error(err);
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



//Walks a folder recursively 
async function fileWalkCopy(directoryPath, target, repo){
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
        repoFolder = directoryPath;
        copyFolder(directoryPath, target, repo);

        repoInNew = target + '/' + repo;
        inFolder = false;
        currentFolder = repoInNew;

        files.forEach(async function (file) {
            

            //if is directory 
            if (fs.statSync(directoryPath + "/" + file).isDirectory()) {
                currentFolder = repoInNew + "/" + file;

                copyFolder(directoryPath + "/" + file,currentFolder,file );
                inFolder = true;
                // need to talk to john about how you know if you are in a folder / when you know you go back out of a folder


                //walk
                //fs.appendFile('Manifest.txt',"Directory :  "+file+"\n",function(error){})
                //fileWalk(directoryPath + "/" + file);

            }
            //if not a dot file get calcs
            else if (!file.startsWith(".")) {
                if(inFolder){
                    copyFile(file,currentFolder);
                }else{
                    copyFile(file, repoInNew)
                }
              

                //fs.appendFile('Manifest.txt',file + "     " + compute.calc(directoryPath, file)+"\n",function(error){})
            }
        });
        //fs.appendFile('Manifest.txt',"--------------------------------\n",function(error){})
        //fs.appendFile('Manifest.txt',"\n\n",function(error){})
    });
}
// givens from user 
//1- repo folder
//2- manifest(for now basically the only manifest in the folder assuming files overwrite each other)
//3- target folder to copy to
//procedure- use repo folder to copy everything over folders and files
// then call walk to manifest everything maybe change artifact id's
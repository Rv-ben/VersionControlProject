module.exports= {
    copy: copyDesired
}
var walking = require('../HelperFunctions/walk');


function moveDesired(targetFolder, whereTo){
    const fs = require('fs-extra');
    // takes two arguements a folder to move and a destination to move to
    // both arguements should be strings
    fs.moveSync(targetFolder, whereTo + "/"  + targetFolder, (err) => {
        //if there is an error anywhere in the process display said error 
        if(err) return console.error(err);
      });
}

function copyDesired(folderToCopy, whereTo){
    const fs = require('fs-extra');
    //takes two arguements the folder in the current directory and the new directory to copy it to
    fs.copySync(folderToCopy, whereTo);
}

//
function checkOut(repoFolder, targetFolder, manifest){
    const fs = require('fs-extra');
    
    if(findRepo(repoFolder,manifest) = -1){
        console.log("repo doesn't exist")
    }else{
        copyDesired(findRepo(repoFolder,manifest), targetFolder);
        walking.walk(findRepo(repoFolder,manifest));
    }

}
// if error happens probably happens here
function findRepo(directoryPath, targetMani){
    fs.readdir(directoryPath, function (err, files) {
        //error checking
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //looks for folder 
        
        files.forEach(function (file) {
            if(files.isdirectory == true && file == targetMani){
                return file;
            }
            return -1; 
        });
    });
    };
    
module.exports= {
    copy: copyDesired,
    check: checkOut
}
var check = require("../Commands/checkIn")
var walking = require('../HelperFunctions/walk');
const fs = require('fs-extra');

/*
 * Moves desired folder to a new destination.
 * @param {targetFolder} a string form of the path of the folder to be moved.
 * @param {whereTo} a string form of the path that the new destination folder will be moved to.
 */
function moveDesired(targetFolder, whereTo){
    
    // takes two arguements a folder to move and a destination to move to
    // both arguements should be strings
    fs.moveSync(targetFolder, whereTo + "/"  + targetFolder, (err) => {
        //if there is an error anywhere in the process display said error 
        if(err) return console.error(err);
      });
}

/*
 * Copies folder to a new destination.
 * @param {folderToCopy} a string form of the path of folder that will be copied.
 * @param {whereTo} a string form of the path the folder will be copied to.
 */
function copyDesired(folderToCopy, whereTo){
    //takes two arguements the folder in the current directory and the new directory to copy it to
    fs.copySync(folderToCopy, whereTo);
}

/*
 * Copies a snapshot of a project tree into a target folder specified by the user should be an empty folder
 * @param {repoFolder} current repository folder of snapshot.
 * @param {targetFolder} new folder for snapshot to be copied into.
 * @param {manifest} the manifest that will be copied over.
 */
function checkOut(repoFolder, targetFolder, manifest){

    if(repoFolder + "Versions/" + manifest.isDirectory){
        fs.copySync(__dirname+'/../Repos/' + repoFolder, targetFolder);
        walking.walk(targetFolder);
    }else if (manifest ==  "Manifest"){
        fs.copySync(__dirname+'/../Repos/' + repoFolder, targetFolder );
    }else{
        console.log("maifest didnt exist")
    }

    walking.walk(targetFolder + "/Current");
    
    
}


// // if error happens probably happens here
// var directoryPath = "../Repos/newerRepo/";
// var targetMani = "P3636L600C5288";
// var targetFol ="../testCheckOut";
// checkOut(directoryPath, targetFol, targetMani);
// console.log(findRepo(directoryPath, targetMani));

// function findRepo(directoryPath, targetMani){
//     fs.readdir(directoryPath, function (err, files) {
//         //error checking
//         if (err) {
//             return console.log('Unable to scan directory: ' + err);
//         } 
//         //looks for folder 
        
//         files.forEach(function (file) {
//             if(files.isdirectory == true ){
//                 return file;
//             }
//             return -1; 
//         });
//     });
//     };
    

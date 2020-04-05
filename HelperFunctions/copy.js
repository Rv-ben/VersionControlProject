module.exports= {
    copy: copyDesired
}
var check = require("../Commands/checkIn")
var walking = require('../HelperFunctions/walk');
const fs = require('fs-extra');

function moveDesired(targetFolder, whereTo){
    
    // takes two arguements a folder to move and a destination to move to
    // both arguements should be strings
    fs.moveSync(targetFolder, whereTo + "/"  + targetFolder, (err) => {
        //if there is an error anywhere in the process display said error 
        if(err) return console.error(err);
      });
}

function copyDesired(folderToCopy, whereTo){
    //takes two arguements the folder in the current directory and the new directory to copy it to
    fs.copySync(folderToCopy, whereTo);
}

//
function checkOut(repoFolder, targetFolder, manifest){

    if(repoFolder + "Versions/" + manifest.isDirectory){
        fs.copySync('../Repos/' + repoFolder, targetFolder);
        walking.walk(targetFolder);
    }else if (manifest ==  "Manifest"){
        fs.copySync('../Repos/' + repoFolder, targetFolder );
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
    
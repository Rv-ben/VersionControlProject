var checkIn = require('../HelperFunctions/checkIn');
var len = require('../HelperFunctions/pathName');
var filesSz = require('../HelperFunctions/pathName');
var fs = require('fs');

function mergeOut(original, changes, target){

    checkIn.checkIn(target);


    //walk all files/folders in both files
    //compare original to changes 
    // add any new files/ folders 
    // any colliding folders ( art ids arent the same ) add changes to original and give them a label 
    //mr for mismatching from repo
    //mt for mismatch from target
    files.forEach(function (file1) {
        var orgFolder = "";
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //if is directory 
        if (fs.statSync(changes + "/" + file1).isDirectory()) {
            //walk
            changesFldr = changes + "/" + file1;
            orgFolder = original + "/" + file1;
            if(!fs.exists(tarFolder)){
                //add folder to target
                fs.mkdir(orgFolder);
            }
            fileWalk(changesFldr);
        }
        //if not a dot file get calcs
        else if (!file1.startsWith(".")) {
            if(fs.exists(orgFolder + "/" + file1)){
                //compare the two files and if they are the same dont do anything and if they differ add both with labels
                var orgRdFile = fs.readFileSync(fullPath+"/"+fileName, 'utf8'); 
                let orgLines = orgRdFile.split("\r\n");
                var chgRdFile = fs.readFileSync(fullPath+"/"+fileName, 'utf8'); 
                let chgLines = chgRdFile.split("\r\n");
                if(len.len(orgLines) != len.len(chgLines) || filesSz.fileSz(orgLines) != filesSz.fileSz(chgLines)){
                    fs.rename(orgFolder + "/" + file1, orgFolder + "/" + file1 + "_MR")
                    fs.rename(chgFolder + "/" + file1, chgFolder + "/" + file1 + "_MT")

                }
                
            }else {
                 fs.copyFile(chgFolder + "/" + file1, orgFolder + "/");
            }
            
        }
    });
    

};
// add everything to a target folder if collisions happen add duplicates 
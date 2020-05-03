var checkIn = require('../HelperFunctions/checkIn');

function mergeOut(original, changes, target){
    checkIn.checkIn(target);


    //walk all files/folders in both files
    //compare original to changes 
    // add any new files/ folders 
    // any colliding folders ( art ids arent the same ) add changes to original and give them a label 
    //mr for mismatching from repo
    //mt for mismatch from target
    files.forEach(function (file1) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //if is directory 
        if (fs.statSync(directoryPath + "/" + file1).isDirectory()) {
            //walk
            fileWalk(directoryPath + "/" + file1);
        }
        //if not a dot file get calcs
        else if (!file.startsWith(".")) {
            
        }
    });
    

};
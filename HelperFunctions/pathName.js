// still need to write read algo for this write read so it reads 
// file in to an array of strings

module.exports = {
    calc: calculations,
    renameFile:renameFile,
    len:calculateFileLength,
    fileSz:calculateFileSize

}

/*
 * Calculates the sum of all characters in the string given.
 * @param stringName, a string that the user would like to calculate the sum of characters on.
 * @return sum, the sum of the string.
 */
function calculateStringSum(stringName){
    var sum = 0;
    var multiplier = 1;
    for(i = 0; i < stringName.length; i++){
        //calculate the ascii code times the multiplyer 
        sum += (multiplier * stringName.charCodeAt(i));
// alter the multiplyer based off of previous
        if(multiplier == 1){
            multiplier = 7;
        }else if(multiplier == 7){
            multiplier = 3;
        }else if(multiplier == 3){
            multiplier = 11;
        }else{
            multiplier = 1;
        }
    }
    // return the sum of all characters in the string times their multiplier
    sum = sum % 10000;
    return sum;
}

/*
 * Calculates the size of a file from an array of a file.
 * @param arrayOfFile, file in array form to calculate size.
 * @return sum, the sum of the file size.
 */
function calculateFileSize(arrayOfFile){// paramater needs to be an array
    var sum = 0;
    var multiplier = 1; 

    for(i = 0; i < arrayOfFile.length; i++){
        var line = arrayOfFile[i];
        for(j = 0; j < line.length; j++){
            sum += multiplier * (line.charCodeAt(j));
            
// alter the multiplyer based off of previous
            if(multiplier == 1){
                multiplier = 7;
            }else if(multiplier == 7){
                multiplier = 3;
            }else if(multiplier == 3){
                multiplier = 11;
            }else if( multiplier == 11){
                multiplier = 1;
            }
        }
    }
    sum = sum % 10000;
    return sum;
}

/*
 * Calculates length of a file from array of file.
 * @param arrayOfFile, file in array form to calculate size.
 * @return count, the count of the file length.
 */
function calculateFileLength(arrayOfFile){
    var count = 0;
    for(i = 0; i < arrayOfFile.length; i++){
        count += arrayOfFile[i].length;

    }
    return count;
}


// only function that needs to be used from this class for outsiders  
/*
 * Function that will do calculations from prior functions on a specified file.
 * @param fullPath, the path of the file in string form.
 * @param fileName, the name of a file in string form.
 * @return newName, the new name of the file with the calculations.
 */
function calculations(fullPath, fileName){

    var fs = require('fs');
    var rdFile = fs.readFileSync(fullPath+"/"+fileName, 'utf8'); 
    let lines = rdFile.split("\r\n");

    var newName;

    var c = calculateFileSize(lines);
    var l = calculateFileLength(lines);
    var p = calculateStringSum(fullPath);

    newName = "P" + p + "L" + l + "C" + c + ".txt";

    //renameFile(fileName,newName);

    return newName;
}

/*
 * Function to rename a file to the correct format.
 * @param currFileName, the current name of the file in string form.
 * @param newName, the new name of the file.
 */
function renameFile(currFileName, newName){
    var fs = require('fs');
    try{
        fs.renameSync(currFileName, newName);
    }catch(err){
        console.log('no such file exists');
    }
}





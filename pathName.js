// still need to write read algo for this write read so it reads 
// file in to an array of strings

module.exports = {
    calc: calculations(fullPath,fileName)
}

// works as expected
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
// works on everything
function calculateFileLength(arrayOfFile){
    var count = 0;
    for(i = 0; i < arrayOfFile.length; i++){
        count += arrayOfFile[i].length;

    }
    return count;
}


// only function that needs to be used from this class for outsiders  
function calculations(fullPath, fileName){
    var fs = require('fs');
    var rdFile = fs.readFileSync(fileName, 'utf8'); 
    let lines = rdFile.split("\r\n");

    var newName;

    var c = calculateFileSize(lines);
    var l = calculateFileLength(lines);
    var p = calculateStringSum(fullPath);

    newName = "P" + p + "L" + l + "C" + c + ".txt";

    return newName;



}






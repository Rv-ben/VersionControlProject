// still need to write read algo for this write read so it reads 
// file in to an array of strings


function calculatestringSum(stringName){
    sum = 0;
    multiplier = 1;
    for(i = 0; i<stringName.length; i++){
        //calculate the ascii code times the multiplyer 
        sum += multiplier * stringName[i].charCodeAt(0);
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
    sum = sum % 1000;
    return sum;
}

function calculateFileSize(arrayOfFile){// paramater needs to be an array
    sum = 0;
    multiplier = 1; 

    for(i = 0; i < arrayOfFile; i++){
        for(j = 0; j < arrayOfFile[i].length; j++){
            sum += multiplier * stringName[i].charCodeAt(0);
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
    }
    sum = sum % 1000;
    return sum;
}

function calculateFileLength(arrayOfFile){
    count = 0;
    for(i = 0; i < arrayOfFile; i++){
        count += arrayOfFile[i].size();

    }
    return count;
}


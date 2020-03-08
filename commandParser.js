const fs = require('fs');

module.exports = {
    parse: parseCMD
}

var makeReep = require('./walk');


//Parse and Interpret Commands
function parseCMD(str){
    
    //sperate the cmd and args
    var cmd = splitWhiteSpace(str)
    if(cmd[1] != undefined)

        //List of commands 
        switch(cmd[0]){
            case "MakeRepo":
            let rightNow = new Date();
            fs.appendFile('Manifest.txt', rightNow + "\n", function(error){}); 
            makeReep.walk(cmd[1]);
            makeReep.copy(cmd[1]);
        }

}   

//Seperate strings, returns list of strings
function splitWhiteSpace(str){
    //find the amount of whiteSpaces
    
    var previousWhiteSpace;
    var cmdArgs =[];
    var elementCount = 0;

    for(var i = 0; i<str.length ; i++){
        if(str[i] == ' '){
            cmdArgs[elementCount] = str.substr(previousWhiteSpace,i);
            previousWhiteSpace=i+1;
            elementCount++;
        }  
    } 

    cmdArgs[elementCount] = str.substr(previousWhiteSpace,i);

    return cmdArgs;
}

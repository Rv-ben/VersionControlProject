

module.exports = {
    parse: parseCMD
}

var makeReep = require('./walk');

function parseCMD(str){
    
    //sperate the cmd and args
    var cmd = splitWhiteSpace(str)
    console.log(cmd)
    if(cmd[1] != undefined)
    
        switch(cmd[0]){
            case "MakeRepo": makeReep.walk(cmd[1]);
        }

    
}   

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


var mrc = require("./makeRepoCommand");
var lr = require("./labelCommand");
var checkIn = require("./checkIn");

module.exports = {
    parse: parseCMD
}

//Parse and Interpret Commands
function parseCMD(str){
    
    //sperate the cmd and args
    var cmd = splitWhiteSpace(str)
    if(cmd[1] != undefined)

        //List of commands 
        switch(cmd[0]){
            case "MakeRepo": mrc.mkrepo(cmd[1]); break;
            case "Label" : lr.label(cmd[1],cmd[2],cmd[3]); break;
            case "CheckIn" : checkIn.checkIn(cmd[1]); break;
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

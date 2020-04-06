
var mrc = require("./makeRepoCommand");
var lr = require("./labelCommand");
var checkIn = require("./checkIn");
var checkOut = require("../HelperFunctions/copy")

module.exports = {
    parse: parseCMD
}

//Parse and Interpret Commands
function parseCMD(str){
    
    //sperate the cmd and args
    var cmd = str.split(" ");
    if(cmd[1] != undefined)

        console.log("Cmd issued: "+cmd[1]+" "+cmd[2]+" ");
        //List of commands 
        switch(cmd[0]){
            case "MakeRepo": mrc.mkrepo(cmd[1]); break;
            case "Label" : lr.label(cmd[1],cmd[2],cmd[3]); break;
            case "CheckIn" : checkIn.checkIn(cmd[1]); break;
            case "CheckOut" : checkOut.check(cmd[1], cmd[2], cmd[3]); break;
        }

}   

//Seperate strings, returns list of strings
function splitWhiteSpace(str){
    //find the amount of whiteSpaces
    console.log("In white split: "+str)
    var previousWhiteSpace =0;
    var cmdArgs =[];
    var elementCount = 0;

    for(var i = 0; i<str.length ; i++){
        if(str[i] == ' '){
            cmdArgs[elementCount] = str.substr(previousWhiteSpace,i);
            previousWhiteSpace=i;
            elementCount++;
        }  
    } 

    cmdArgs[elementCount] = str.substr(previousWhiteSpace,i);

    return cmdArgs;
}

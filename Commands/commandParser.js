
var mrc = require("./makeRepoCommand");
var lr = require("./labelCommand");
var checkIn = require("./checkIn");
var checkOut = require("../HelperFunctions/copy")
var MergeIn = require("./mergeIn");
var MergeOut = require("./mergeOut");

module.exports = {
    parse: parseCMD
}

//Parse and Interpret Commands
/**
 * Function that reads from command line and parses input.
 * @param {String} str String read into command line.
 */
function parseCMD(str){
    
    //sperate the cmd and args
    var cmd = str.split(" ");
    if(cmd[1] != undefined)

        console.log("Cmd issued: "+cmd[0]);
        //List of commands 
        switch(cmd[0]){
            case "MakeRepo": mrc.mkrepo(cmd[1]); break;
            case "Label" : lr.label(cmd[1],cmd[2],cmd[3]); break;
            case "CheckIn" : checkIn.checkIn(cmd[1]); break;
            case "CheckOut" : checkOut.check(cmd[1], cmd[2], cmd[3]); break;
            case "MergeIn" : MergeIn.mergeIn(cmd[1]); break;
            case "MergeOut": MergeOut.mergeOut(cmd[1],cmd[2],cmd[3]); break;
        }

}   

//Seperate strings, returns list of strings
/**
 * Function used to split commands by white space.
 * @param {String} str String to be seperated by white space.
 * @return {List} cmdArgs List of command arguments seperated by string read in by white space.
 */
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

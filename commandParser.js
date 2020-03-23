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
            case "MakeRepo": makeRepo(cmd[1]); break;
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

//Makes a repo given a folder argument
function makeRepo(arg){

    let rightNow = new Date();
    
    //Makes a new directory if one does not exist 
    if(!fs.existsSync(arg))
        fs.mkdirSync(arg)

    //Exits if the directory is already a repo
    if(fs.existsSync(arg+"/.versions")){
        console.log("Already a repo")
        return
    }

    fs.mkdirSync(arg+"/.versions")

    fs.appendFile('Manifest.txt', rightNow + "\n", function(error){}); 
    makeReep.walk(arg);
    makeReep.copy(arg);
}


parseCMD("MakeRepo folder_name");

module.exports = {
    parse: parseCMD
}

function parseCMD(str){
    
    //sperate the cmd and args
    var cmd = splitWhiteSpace(str)

    
    switch(cmd[0]){
        case "MakeRepo": makeRepo(cmd[1]);
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
            previousWhiteSpace=i;
            elementCount++;
        }  
    } 

    cmdArgs[elementCount] = str.substr(previousWhiteSpace,i);

    return cmdArgs;
}

function makeRepo(foldName){
    console.log(foldName);
}
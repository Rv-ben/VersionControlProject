
parseCMD("MakeRepo folder_name");

function parseCMD(str){
    
    //sperate the cmd and args
    var cmd = splitWhiteSpace(str)

    
    console.log(cmd)

    
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
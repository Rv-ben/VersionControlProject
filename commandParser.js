
parseCMD("mrp foldname");

function parseCMD(str){
    
    //get first three chars of cmd
    var cmd = str[0] + str[1] + str[2];
    
    var args = str.substr(3,str.length)
    
    console.log(cmd + " "+args)

}   
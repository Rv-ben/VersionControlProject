
var artId = require("./pathName");
var fs = require('fs');

//returns 0 if correctly labeled
//returns 1 if repoDoes does not exist
//returns 2 if manifest does not exist
function labelManifest(lString,repoName,manName){
    
    //return if not a repo
    if(!fs.existsSync(repoName))
        return 0;
    
    

}
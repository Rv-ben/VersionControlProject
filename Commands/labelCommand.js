
var artId = require("../pathName");
var fs = require('fs');


module.exports = {
    label: labelManifest
};

//returns 0 if correctly labeled
//returns 1 if repo does not exist
//returns 2 if manifest does not exist
function labelManifest(lString,repoName,manName){
    
    //return if not a repo
    if(!fs.existsSync(repoName)){
        console.log("Repo does not exist");
        return 1;
    }
    
    //read json file in versions folder
    var versionsData = fs.readFileSync(repoName+"/.versions/Versions.json");

    //parse the json info into an object 
    var dataObject = JSON.parse(versionsData);

    //Find the index for the specific manifest name or label 
    var index = findManifest(manName, dataObject.Versions);

    //if not found return
    if(index == -1){
        console.log("Manifest not found");
        return 2;
    }

    //push a new label using found index 
    dataObject.Versions[index].labels.push(lString);
    
    //parse the object data into a json string
    var newJsonData = JSON.stringify(dataObject);

    //over wrire the file 
    fs.writeFileSync(repoName+"/.versions/Versions.json",newJsonData);

    return 0;
}

//return -1 if not found 
//return index if found 
function findManifest(manName,versionsObj){
    for(var i = 0; i< versionsObj.length ;i++){

        if(versionsObj[i].ManifestID == manName) //found if user inputted a manifestID
            return i;
        for(var j = 0; j< versionsObj[i].labels.length;j++){
            if(versionsObj[i].labels[j]==manName) //found if user inputted a label
                return i;
        }
    }
    return -1;
}
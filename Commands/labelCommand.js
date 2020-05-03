
var artId = require("../HelperFunctions/pathName");
var fs = require('fs');


module.exports = {
    label: labelManifest
};

//returns 0 if correctly labeled
//returns 1 if repo does not exist
//returns 2 if manifest does not exist
/*
 * Function to give label to a manifest.
 * @param {String} lString New label for manifest.
 * @param {String} repoName Name of repository where manifest exists.
 * @param {String} manName Current name of manifest.
 * @return {Number} 0 if manifest is correctly labeled, 1 if repo does not exist, 2 if manifest does not exist.
 */
function labelManifest(lString, repoName ,manName){
    
    //return if not a repo
    if(!fs.existsSync(__dirname+"/../Repos/"+repoName)){
        console.log("Repo does not exist");
        return 1;
    }
    
    //read json file in versions folder
    var versionsData = fs.readFileSync(__dirname+"/../Repos/" +repoName+"/Versions/Versions.json");

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
    fs.writeFileSync(__dirname+"/../Repos/" +repoName+"/Versions/Versions.json",newJsonData);

    return 0;
}

//return -1 if not found 
//return index if found 

/*
 * Function used to search for manifest
 * @param {String} manName Name of manifest to search for.
 * @param {List} versionsObj List of versions that the manifest has had.
 * @return {Number} Index if found, -1 if the manifest was not found.
 */
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

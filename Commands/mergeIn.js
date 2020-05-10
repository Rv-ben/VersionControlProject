const fs = require('fs');
const fse = require('fs-extra')
//utilizing helper functions

var pathName = require('../HelperFunctions/pathName');
var walking = require('../HelperFunctions/walk');
module.exports={
	mergeIn:mergeIn
}
//need to pull current repo name
//var repoName = 'mergeOut';
//mergeIn(repoName);

/**
 * Function for checking in file into VCS.
 * @param {String} repoName Name of the repository to be checked in.
 */
function mergeIn(repoName){

	var vcsPath = __dirname+"/../"

walking.walk(vcsPath+ 'Repos/'+ repoName + '/Current');

setTimeout(() => {
	//Copy mani from vcs to current
	fse.copySync(vcsPath+"Manifest.txt",vcsPath+"Repos/" + repoName + "/Current/Manifest.txt");

	//calc manID 
	var manID = pathName.calc(vcsPath+'Repos/' + repoName + '/Current', 'Manifest.txt');

	//Rename mani in current to new man name
	fs.renameSync(vcsPath+'Repos/' + repoName + '/Current/Manifest.txt' , vcsPath+'Repos/' + repoName + '/Current/' + manID);

	//Strip the dot text
	var targetDir = vcsPath+'Repos/' + repoName + '/Versions/' + manID.replace(".txt", "");

	//make make the new snapshot folder
	fs.mkdirSync(targetDir);

	//Get everything in current and place in new snapshot
	fse.copySync(vcsPath+'Repos/' + repoName + '/Current', targetDir);

	//Rename file that is copied over 
	fs.renameSync(vcsPath+'Repos/' + repoName + '/Current/' + manID, vcsPath+'Repos/' + repoName + '/Current/Manifest.txt');

	addMan(repoName, manID);
}, 3000);

/**
 * Function that adds the manifest into the VCS, called from mergeIn
 * @param {String} repoName Name of the repository where the manifest will be added.
 * @param {Number} manID Identification number for manifest
 */
function addMan(repoName, manID){

	var vcsPath = __dirname+"/../";
	var readJson = fs.readFileSync( vcsPath+"Repos/" + repoName + "/Versions/Versions.json");
	var data = JSON.parse(readJson);
	
	//console.log(data);
	addThis = {"ManifestID": manID , Labels : []};
	data.Versions.push(addThis);
	//console.log(data);
	addToFile = JSON.stringify(data);
	fs.writeFile(vcsPath+'Repos/' + repoName + '/Versions/Versions.json', addToFile, function(error){});


}

}
//need to pull the previous manifest and the new one
module.exports={
	checkIn:checkIn
}
const fs = require('fs');
const fse = require('fs-extra')
//utilizing helper functions
var pathName = require('../HelperFunctions/pathName');
var walking = require('../HelperFunctions/walk');

//need to pull current repo name
 //var repoName = 'newerRepo';
 //checkIn(repoName);

function checkIn(repoName){
walking.walk('../Repos/' + repoName + '/Current');
setTimeout(() => {
	fse.copySync("Manifest.txt","../Repos/" + repoName + "/Current/Manifest.txt");
	var manID = pathName.calc('../Repos/' + repoName + '/Current', 'Manifest.txt');
	fs.renameSync('../Repos/' + repoName + '/Current/Manifest.txt' , '../Repos/' + repoName + '/Current/' + manID);
	var targetDir = '../Repos/' + repoName + '/Versions/' + manID.replace(".txt", "");
	fs.mkdirSync(targetDir);
	fse.copySync('../Repos/' + repoName + '/Current', targetDir);
	fs.renameSync('../Repos/' + repoName + '/Current/' + manID, '../Repos/' + repoName + '/Current/Manifest.txt');
	addMan(repoName, manID);
}, 3000);

function addMan(repoName, manID){
	var readJson = fs.readFileSync("../Repos/" + repoName + "/versions/Versions.json");
	var data = JSON.parse(readJson);
	
	console.log(data);
	addThis = {"ManifestID": manID , Labels : []};
	data.Versions.push(addThis);
	console.log(data);
	addToFile = JSON.stringify(data);
	fs.writeFile('../Repos/' + repoName + '/Versions/Versions.json', addToFile, function(error){});


}

}





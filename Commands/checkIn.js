//need to pull the previous manifest and the new one
module.exports={
	checkIn:checkIn
}
const fs = require('fs');
const fse = require('fs-extra')
//utilizing helper functions
var pathName = require('../HelperFunctions/pathName');
var walking = require('../HelperFunctions/walk');
var version = require('./makeRepoCommand');
//for timestamp
let fullDate = new Date();
//need to pull current repo name
var repoName = 'doubles';

checkIn(repoName, fullDate);
function checkIn(repoName){
walking.walk('../Repos/' + repoName + '/Current');
fs.appendFile('Manifest.txt', fullDate + "\n", function(error){}); 
setTimeout(() => {
	
	fse.copySync("Manifest.txt","../Repos/" + repoName + "/Current/Manifest.txt");
	var manID = pathName.calc('../Repos/' + repoName + '/Current', 'Manifest.txt');
	fs.renameSync('../Repos/' + repoName + '/Current/Manifest.txt' , '../Repos/' + repoName + '/Current/' + manID);
	var targetDir = '../Repos/' + repoName + '/Versions/' + manID.replace(".txt", "");
	fs.mkdirSync(targetDir);
	fse.copySync('../Repos/' + repoName + '/Current', targetDir);
	fs.renameSync('../Repos/' + repoName + '/Current/' + manID, '../Repos/' + repoName + '/Current/Manifest.txt');
	version.jsonV('../Repos/' + repoName + '/Versions/' + manID, manID);
}, 3000);

}





//need to pull the previous manifest and the new one
module.exports={
	checkIn:checkIn
}
const fs = require('fs');
const fse = require('fs-extra')
var pathName = require('../HelperFunctions/pathName');
var walking = require('../HelperFunctions/walk');
var copyCurrent = require('../HelperFunctions/copy');
let fullDate = new Date();
//need to pull current repo name
var repoName = 'newRepos';

checkIn(repoName, fullDate);
function checkIn(repoName){
walking.walk('../Repos/' + repoName + '/Current');

setTimeout(() => {
	fs.appendFile('Manifest.txt', fullDate + "\n", function(error){}); 
	//fs.appendFile('../Repos/' + repoName + '/Current/Manifest.txt', fullDate);
	fse.copySync("Manifest.txt","../Repos/" + repoName + "/Current/Manifest.txt");
	var manID = pathName.calc('../Repos/' + repoName + '/Current', 'Manifest.txt');
	fs.renameSync('../Repos/' + repoName + '/Current/Manifest.txt' , '../Repos/' + repoName + '/Current/' + manID);
	var targetDir = '../Repos/' + repoName + '/Versions/' + manID.replace(".txt", "");
	fs.mkdirSync(targetDir);
	fse.copySync('../Repos/' + repoName + '/Current', targetDir);
	fs.renameSync('../Repos/' + repoName + '/Current/' + manID, '../Repos/' + repoName + '/Current/Manifest.txt');
	
}, 1500);

}





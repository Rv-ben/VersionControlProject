//need to pull the previous manifest and the new one
const fs = require('fs');
var fileConfig = require('./pathName');
var walking = require('./walk');
var copy = require('./copy');
//can change if label will keep version count
static var versionCount;

var checkInFile = fs.readFile();
var previousVersionSize = fs.readFile('Manifest.txt');

function checkIn(checkInFile, previousVersionSize){

//need to maintain version sizes
var oldSize = fileConfig.calculations(previousVersionSize);

var newManifest = walking.walk(checkInFile);
//calculate size of manifest from previous version to check for changes being pushed
////var sum = fileConfig.calculations(newDirectory);


////rename current
// fs.rename(currPath, newPath, function(err) {
// 	if (err) {
// 	  console.log(err)
// 	}
//// })

////move newly renamed directory to previous versons folder
//moveDesires(current, previousVersions + "/" + current);
////

////create new folder named current in place of old one
//
////

////copy repo folder from check in into current
//
////

//increment the versionCount and return new manifest
	versionCount += 1;
	return sum;


}


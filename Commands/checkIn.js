//need to pull the previous manifest and the new one
const fs = require('fs');
var checkIn = fs.readFile('Manifest.txt');
var previousVersionSize = fs.readFile()
;
function checkIn(checkIn, previousVersionSize){
//accept input from user
var newDirectory = walk.fileWalk(checkIn);
//need to maintain version sizes
var oldSize = previousVersionSize;
//calculate size of manifest from previous version to check for changes being pushed
var sum = pathName.calculateStringSum(newDirectory);
var versionCount;
//check to see if artifact ID has changed and replace if yes
if (sum != oldSize){
	versionCount += 1;
	return oldSize = sum;
	}
	versionCount += 1;
	return oldSize;
}


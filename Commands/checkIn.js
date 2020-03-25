function checkIn(checkIn){
//accept input from user
var checkIn;
//need to maintain version sizes
var previousVersionSize;
//calculate size of previous version to check for changes being pushed
var sum = pathName.calculateStringSum(checkIn);
var versionCount;
//check to see if artifact ID has changed and replace if yes
if (sum != previousVersionSize){
	versionCount += 1;
	return previousVersionSize = sum;
	}
	versionCount += 1;
	return previousVersionSize;
}
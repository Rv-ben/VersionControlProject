//need to pull the previous manifest and the new one
const fs = require('fs');
const fse = require('fs-extra')
var pathName = require('../HelperFunctions/pathName');
var walking = require('../HelperFunctions/walk');
var copyCurrent = require('../HelperFunctions/copy');


//walk
walking.walk('../Repos/newRepo/Current');
fse.copySync("Manifest.txt","../Repos/newRepo/Current/Manifest.txt")
var manID = pathName.calc('../Repos/newRepo/Current', 'Manifest.txt');
fs.renameSync('../Repos/newRepo/Current/Manifest.txt' , '../Repos/newRepo/Current/' + manID);
var targetDir = '../Repos/newRepo/Versions/' + manID.replace(".txt", "");
fs.mkdirSync(targetDir);
fse.copySync('../Repos/newRepo/Current', targetDir);
fs.renameSync('../Repos/newRepo/Current/' + manID, '../Repos/newRepo/Current/Manifest.txt');

//timestamp





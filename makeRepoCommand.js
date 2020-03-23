const fs = require('fs');


var makeReep = require('./walk');
var calc = require('./pathName');

module.exports = {
    mkrepo: makeRepo
}


//Makes a repo given a path to folder as an arguument
function makeRepo(path){

    let rightNow = new Date();

    var versionsPath = path+"/.versions";
    
    //Makes a new directory if one does not exist 
    if(!fs.existsSync(path))
        fs.mkdirSync(path)

    //Exits if the directory is already a repo
    if(fs.existsSync(versionsPath)){
        console.log("Already a repo")
        return
    }

    fs.mkdirSync(versionsPath)


    fs.appendFile('Manifest.txt', rightNow + "\n", function(error){}); 
    makeReep.walk(path);

    //place manifest in .versions dir
    cpyManifest(path);

    setTimeout(() => {
        var maniID = calc.calc(path+'/.versions', 'Manifest.txt')
        makeVersionJSON(versionsPath,maniID);
    }, 1500);
    //place json file in the .versions dir

}


function makeVersionJSON(path, maniID){
    var maniOBJ = {Versions:[{ManifestID: maniID , labels:[]}]}

    var data = JSON.stringify(maniOBJ);

    fs.writeFile(path+'/Versions.json',data, function(error){});
}

//place a copy of the manifest in the .versions folder
async function cpyManifest(directoryPath){
    fs.readFile('Manifest.txt',function(err,data){
        fs.writeFile(directoryPath+"/.versions/Manifest.txt",data,function(err){})
    })
}

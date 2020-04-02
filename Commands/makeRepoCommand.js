const fs = require('fs');


var makeReep = require('../HelperFunctions/walk');
var calc = require('../HelperFunctions/pathName');

module.exports = {
    mkrepo: makeRepo
}


//Makes a repo given a path to folder as an arguument
function makeRepo(path){

    path = "Repos/"+path;

    let rightNow = new Date();

    var versionsPath = path+"/.versions";

    //Make a repos folder if one does not exist
    if(!fs.existsSync("Repos"))
        createRepoDir();
    
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
        addRepoName(path.replace("Repos/",''));
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

function createRepoDir(){
    fs.mkdirSync("Repos")
    setTimeout(() => {
        fs.writeFileSync("Repos/RepoNames.json",JSON.stringify({"Repos":[]}))
    }, 1500);
}

function addRepoName(name){
    var repoNames = JSON.parse(fs.readFileSync("Repos/RepoNames.json"));
    repoNames.Repos.push(name);

    fs.writeFileSync("Repos/RepoNames.json",JSON.stringify(repoNames));
}

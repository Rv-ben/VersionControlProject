const fs = require('fs');
const fsx = require('fs-extra')
const express = require("express")

var ex = express()

var makeReep = require('../HelperFunctions/walk');
var calc = require('../HelperFunctions/pathName');

module.exports = {
    mkrepo: makeRepo
}


ex.listen(5132,function(){

})

//Makes a repo given a path to folder as an arguument
function makeRepo(path){

    path = "Repos/"+path;

    let rightNow = new Date();

    var versionsPath = path+"/Versions";

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

    fs.mkdirSync(path+"/Current")


    fs.appendFile('Manifest.txt', rightNow + "\n", function(error){}); 
    makeReep.walk(path+"/Current");

    addRepoName(path.replace("Repos/",''));
    setTimeout(() => {
        //place manifest in .versions dir
        fsx.copyFileSync(__dirname+"/../Manifest.txt",__dirname+"/../"+path+"/Current/Manifest.txt")
        var maniID = calc.calc(path+"/Current", 'Manifest.txt')
        makeVersionJSON(versionsPath,maniID);
        ex.get('/'+path.replace("Repos/",'')+'.json',function(req,res){
            if(fs.existsSync(path+"/Versions/Versions.json"))
                res.json(JSON.parse(fs.readFileSync(path+"/Versions/Versions.json")));
            else
                console.log("not sent")
            
        })
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
    console.log(directoryPath);
    fs.readFileSync(__dirname+'/../Manifest.txt',function(err,data){
        console.log(data);
        console.log("err: "+err);
        fs.writeFileSync(__dirname+"/../"+directoryPath+"/Manifest.txt",data,function(err){
            console.log("err: "+err);
        })
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

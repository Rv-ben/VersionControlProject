var checkIn = require('../Commands/checkIn');
var filesSz = require('../HelperFunctions/pathName');
var fs = require('fs');
var fse = require('fs-extra');
var walking = require('../HelperFunctions/walk');

module.exports={
	mergeOut:mergeOut
}

function mergeOut(Repo, partOfRepo, target){
    var vcsPath = "C:/Users/colin/IdeaProjects/tester/src/VersionControlProject/";
    var gma = vcsPath + "Repos/" + Repo + "/Current";
    var version = vcsPath + "Repos/" + Repo + "/Versions/" + partOfRepo ;
    var tar = vcsPath + target;

    checkIn.checkIn(tar);
    
    
    fs.readdir(version , function (err, files) {
        //error checking
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        if( !fs.existsSync(tar + "/Versions/")){
            fs.mkdir(tar + "/Current/", (err) => {})
            fs.mkdir(tar + "/Versions", (err) => {});
        }
        if(!fs.existsSync(tar + "/Versions/" + partOfRepo)){
            fs.mkdir(tar + "/Versions/" + partOfRepo, (err) => {});
        }

    
    files.forEach(function (file1) {
        
        if (err) {
            return console.log('Unable to scan directory: ' + err);

        }
        //if is directory 
        if (fs.statSync(version + "/" + file1).isDirectory()) {
            //walk

            if(!fs.existsSync(tar + "/Versions/" + partOfRepo)){
                fs.mkdir(tar + "/Versions/" + partOfRepo, (err) => {});
                fse.copySync(version , tar + "/Versions/" + partOfRepo);
            }
            fileWalk(version + "/" + file1);
        }
        //if not a dot file get calcs
        else if (!file1.startsWith(".")) {

            if(fs.existsSync(tar + "/Versions/" + partOfRepo + "/" + file1)){
                var targetfile = tar + "/Versions/" + partOfRepo + "/" + file1;
                var tarRdFile = fs.readFileSync(targetfile , 'utf8'); 
                let tarLines = tarRdFile.split("\r\n");
                var rdVer = fs.readFileSync(version, 'utf8');
                let verLines = rdVer.split("\r\n");
                
                if(filesSz.fileSz(tarLines) != filesSz.fileSz(verLines)){
                    fs.renameSync(targetfile, tar + "/Versions/" + partOfRepo + "/" + partOfRepo + "MT_");
                    fs.copyFileSync(version, targetfile);
                    fs.renameSync(targetfile, tar + "/Versions/" + partOfRepo + "/" + partOfRepo + "MR_");
                    fse.copySync(gma, targetfile, tar + "/Versions/" + partOfRepo + "/" + "MG_");
                
            }
           
                    
            }
            
    }

 
})
walking.walk(tar);
})
}
// //need to figure this out to actually get copy to work
// //fs.copyFileSync("C:/Users/colin/IdeaProjects/tester/src/VersionControlProject/Repos/thisrepo/Versions/P1418L513C9382/P1418L513C9382.txt", "C:/Users/colin/IdeaProjects/tester/src/VersionControlProject/"  +  target + "/P1418L513C9382.txt" );

// // add everything to a target folder 
// //if collisions happen add duplicates wiht appropriate labels/names
// // use full path to get to a folder or file in this 
// // look at checkin for vcs path i think its called fro reference


// useful template for the comparisons 
//console.log(fs.existsSync(tar + "/Versions/" + partOfRepo));
    // if(fs.existsSync(tar + "/Versions/" + partOfRepo)){
    //     var targetfile = tar + "/Versions/" + partOfRepo ;
    //     var tarRdFile = fs.readFileSync(targetfile , 'utf8'); 
    //     let tarLines = tarRdFile.split("\r\n");
    //     var rdVer = fs.readFileSync(version, 'utf8');
    //     let verLines = rdVer.split("\r\n");
        
    //     if(filesSz.fileSz(tarLines) != filesSz.fileSz(verLines)){
    //         fs.renameSync(targetfile, tar + "/Versions/" + partOfRepo + "/" + partOfRepo + "MT_" +".txt");
    //         fs.copyFileSync(version, targetfile);
    //         fs.renameSync(targetfile, tar + "/Versions/" + partOfRepo + "/" + partOfRepo + "MR_" +".txt")

    //         console.log("already there and different");
    //     }else{
    //         // in last version of this else wont exist because nothing happens if there already exists a copy of that exact file or folder
    //         console.log("already there and the same");
    //     }
        
    // }
    // else{
    //     if( !fs.exists(tar + "/Versions/", (exists) => {})){
    //         fs.mkdir(tar + "/Current/", (err) => {})
    //         fs.mkdir(tar + "/Versions", (err) => {});
    //     }
    //     fs.mkdir(tar + "/Versions/" + partOfRepo, (err) => {});
    //     fse.copySync(version , tar + "/Versions/" + partOfRepo);
    // }





//rename repo path
var express = require('express');
var path = require('path');
const fs = require('fs');
var ex = express();
var BodyParser =  require('body-parser');
var port = 5131;
var cmdParser = require('./Commands/commandParser');
var artID = require('./HelperFunctions/pathName')
var router = express.Router();
var URL = require('url');


ex.use(express.static("FrontEnd"));

//Send the shell
ex.get('/',function(req,res){
    frontPage(res);
})

ex.get('/repos.json',function(req,res){
    if(fs.existsSync("./Repos/RepoNames.json"))
        res.json(JSON.parse(fs.readFileSync("./Repos/RepoNames.json")));
    
})

router.param('reponame',function(req,res,next,repo){
    if(fs.existsSync("./Repos/"+repo+"/Versions/Versions.json"))
        res.json(JSON.parse(fs.readFileSync("./Repos/"+repo+"/Versions/Versions.json")))
})


router.get('/json/:reponame',function(req,res,nect){
})

ex.get('/RepoPage',function(req,res){
    res.sendFile(path.join(__dirname+"/FrontEnd/RepoPage.html"))
})

//Start server
ex.listen(port,function(){
    console.log("port:  "+port);
})


//Form declarations
ex.use(BodyParser.json())
ex.use(BodyParser.urlencoded({ extended: false }))

ex.use(router)

//Form submittion handling 
ex.post('/makerepo', function(req,res){
    fs.writeFile("Manifest.txt","Command Issued:  "+ req.body.cmd +"\n\n",function(error){})
    cmdParser.parse("MakeRepo "+req.body.cmd);
});


function frontPage(res){
    res.sendFile(path.join(__dirname+'/FrontEnd/FrontPage.html'));
}

ex.post('/checkIn', function(req, res){

    console.log(req.body.repoName)
    
    //cmdParser.parse("CheckIn " + req.body.repoName);
});

//repoFolder, targetFolder, manifest
ex.post('/checkOut', function(req, res){
    var targetLoca = req.body.dir;
    var targetMan = req.body.man;
    var repoName = req.body.repoName;

    
    cmdParser.parse("CheckOut " + repoName+ " " + targetLoca+ " " + targetMan);

});

ex.post('/labelCommand', function(req,res){

    console.log(req.body.repoName)
    cmdParser.parse("Label " + req.body.newLabel + " " + req.body.repoName + " " + req.body.oldLabel);
    res.send("Hello")
});

ex.post('/mergeIn', function(req, res){

    cmdParser.parse("mergeIn " + req.body.dir);

});

ex.post('/mergeOut',function(req,res){

    cmdParser.parse("mergeOut "+ req.body.repoName+" "+req.body.snapshot+" "+req.body.branch)

})
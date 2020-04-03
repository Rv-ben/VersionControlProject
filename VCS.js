var express = require('express');
var path = require('path');
const fs = require('fs');
var ex = express();
var BodyParser =  require('body-parser');
var port = 5131;
var cmdParser = require('./Commands/commandParser');

ex.use(express.static("FrontEnd"));

//Send the shell
ex.get('/',function(req,res){
    frontPage(res);
})

ex.get('/repos.json',function(req,res){
    if(fs.existsSync("./Repos/RepoNames.json"))
        res.json(JSON.parse(fs.readFileSync("./Repos/RepoNames.json")));
    
})

//Start server
ex.listen(port,function(){
    console.log("port:  "+port);
})

//Form declarations
ex.use(BodyParser.json())
ex.use(BodyParser.urlencoded({ extended: true }))

//Form submittion handling 
ex.post('', function(req,res){
    fs.writeFile("Manifest.txt","Command Issued:  "+ req.body.cmd +"\n\n",function(error){})
    cmdParser.parse("MakeRepo "+req.body.cmd);
});


function frontPage(res){
    res.sendFile(path.join(__dirname+'/FrontEnd/FrontPage.html'));
}

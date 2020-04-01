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
    res.sendFile(path.join(__dirname+'/FontEnd/FrontPage.html'));
})

//Start server
ex.listen(port,function(){
    console.log("port:  "+port);
})

//Form declarations
ex.use(BodyParser.json())
ex.use(BodyParser.urlencoded({ extended: true }))

//Form submittion handling 
ex.post('/cmdForm', function(req,res){
    fs.writeFile("Manifest.txt","Command Issued:  "+ req.body.cmd +"\n\n",function(error){})
    cmdParser.parse(req.body.cmd)
    res.sendFile(path.join(__dirname+'/OutputTest.html'))
})


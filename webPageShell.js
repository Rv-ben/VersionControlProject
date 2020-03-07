var express = require('express');
var path = require('path');
var ex = express();
var BodyParser =  require('body-parser');
var port = 5130;
var cmdParser = require('./commandParser');


ex.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/shellFrontEnd.html'));
})

ex.listen(port,function(){
    console.log("port:  "+port);
})

ex.use(BodyParser.json())
ex.use(BodyParser.urlencoded({ extended: true }))

ex.post('/cmdForm', function(req,res){
    console.log("Command Issued:  "+ req.body.cmd)
    console.log("\n\n")
    cmdParser.parse(req.body.cmd)
    res.end()
})


var express = require('express');
var path = require('path');
var ex = express();
var BodyParser =  require('body-parser');
var port = 5110;
var cmdParser = require('./commandParser');


ex.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/shellFrontEnd.html'));
})

ex.listen(port,function(){
    console.log(port);
})

ex.use(BodyParser.json())
ex.use(BodyParser.urlencoded({ extended: true }))

ex.post('/cmdForm', function(req,res){
    console.log(req.body.cmd)
    cmdParser.parse(req.body.cmd)
    res.end()
})


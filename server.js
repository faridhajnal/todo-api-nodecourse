var express = require('express'); //express npm module
var app = express(); //start express
var PORT = process.env.PORT || 3000; //environment variable from heroku

app.get('/', function(req,res){
    
    
    res.send('ToDo API root');
    
});

app.listen(PORT, function(){ //callback function
    
    console.log('Express listening on port: ' + PORT);
    
});
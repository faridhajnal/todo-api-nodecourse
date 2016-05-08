var express = require('express'); //express npm module
var app = express(); //start express
var PORT = process.env.PORT || 3000; //environment variable from heroku

var todos = [
    
    //todo collection (alle) todo model (eins)
    
    {   
        id : 1,    
        description : 'Practice #2 AICD',
        completed : false
    },
    
    {
        id: 2,
        description : 'Wist contract docs',
        completed : false
    },
    
    {
        id: 3,
        description : 'Cordova activity',
        completed : true
    }
    
     
];

app.get('/', function(req,res){
    
    
    res.send('ToDo API root');
    
});

app.get('/todos', function(request,response){
    
   response.json(todos); 
    
});

app.get('/todos/:id', function(request,response){
    
    var todoId = request.params.id;
    
    console.log('Asking for todo with id: ' + todoId); //params is short for url paramteres

    var match = false;
    todos.forEach(function(element) {
        
        if(element.id==todoId){ // === checks Type!
            
            console.log('found a match!');
            match = true;
            response.json(element);
            
        } 
    });
    
   if(!match) {
       console.log('404 Not found!');
       response.status(404).send();
   }
    
    
});

app.listen(PORT, function(){ //callback function
    
    console.log('Express listening on port: ' + PORT);
    
});
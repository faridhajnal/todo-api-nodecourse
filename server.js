var express = require('express'); // npm modules
var bodyparser = require('body-parser');
var _ = require('underscore'); //similar to linq on C#



var app = express(); //start express
var PORT = process.env.PORT || 3000; //environment variable from heroku

var todos = [];
var todoNextId = 1;
/* HARDCODED:
    [
    
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
*/

app.use(bodyparser.json());

app.get('/', function(req,res){
    
    
    res.send('ToDo API root');
    
});

app.get('/todos', function(request,response){
    
   response.json(todos); 
    
});

app.get('/todos/:id', function(request,response){
    
    var todoId = parseInt(request.params.id, 10);
    
    console.log('Asking for todo with id: ' + todoId); //params is short for url paramteres

    var matchedTodo = _.findWhere(todos, {id:todoId});//find where => 1 result (linq)
    /*todos.forEach(function(element) {
        
        if(element.id==todoId){ // === checks Type!
            
            console.log('found a match!');
            match = true;
            response.json(element);
            
        } 
    }); 'NORMAL IMPLEMENTATION' 
    
   if(!match) {
       console.log('404 Not found!');
       response.status(404).send();
   }
   
   */
   if(matchedTodo) response.json(matchedTodo);
   else response.status(404).send();
    
    
});

app.post('/todos', function(request,response){ //body parser npm needed
    
    var body = _.pick(request.body, 'description', 'completed'); //pick from body only description and completed keys
    
    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        
        return response.status(400).send('Format Problem, check'); //request cannot be completed
        
    }
    
    body.description = body.description.trim(); //discard additional spaces(beginning , end)
    
    
    console.log('description: ' + body.description);
    /*todos.push({
        
        id : todoNextId,
        description : body.description,
        completed : body.completed
        
    });*/
    body.id = todoNextId;
    todos.push(body);
    todoNextId += 1;
    response.json(body); //send the same data back
    
});

app.listen(PORT, function(){ //callback function
    
    console.log('Express listening on port: ' + PORT);
    
});
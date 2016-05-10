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

///GET ALLE
app.get('/todos', function(request,response){
    
   response.json(todos); 
    
});

//GET BY ID

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

//POST

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

//DELETE

app.delete('/todos/:id', function(request,response){
    
    var todoId = parseInt(request.params.id, 10);
    //var tododes = request.params.status;
    //var matchedTodo = _.findWhere(todos, {description:tododes});
    var matchedTodo = _.findWhere(todos, {id:todoId}); 
    if(!matchedTodo){
        response.status(404).json({"error":"no todo matches the id"});
        
        
    }
     
   else {
       
       todos = _.without(todos, matchedTodo); //first param array to remove from, second element to remove
       response.json(matchedTodo);
       
   }
    
    
    
});


//UPDATE ((PUT))

app.put('/todos/:id', function(request,response){ 
    var todoId = parseInt(request.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id:todoId}); 
    
    if(!matchedTodo) return response.status(404).send('id is not valid');
    
    var body = _.pick(request.body, 'description', 'completed');//only valid fields for json
    var validAttributes = {}; //empty json object
   
    
    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
        
        validAttributes.completed = body.completed;
        
    } //boolean method has own property and corresponds to type
    
    else if(body.hasOwnProperty('completed')){ //is not boolean (implicit)
        
        return response.status(400).send('value completed must be boolean');
        
    }
    
    //else, nothing will happen, no problem...
    
    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length>0){
        
        validAttributes.description = body.description;
        
    } //boolean method has own property and corresponds to type
    
    else if(body.hasOwnProperty('description')){ //is not boolean (implicit)
        
        return response.status(400).send('value for description is not string');
        
    }
   
    
    //same for this on the else 
    
    
    //now we can update
    
    _.extend(matchedTodo, validAttributes); //this method overrides the exisiting properties and modifies the one needed, it then returns an object
    response.json(matchedTodo);                                                    //first argument is 'original' object and second is the one with the overrides ((id remains equal))
    //matchedTodo was modified on the extend method, without need of assigning explicitly to update in code. ((using as void))                                                    


});
    
    
    

app.listen(PORT, function(){ //callback function
    
    console.log('Express listening on port: ' + PORT);
    
});
var express = require('express'); // npm modules
var bodyparser = require('body-parser');
var _ = require('underscore'); //similar to linq on C#
var db = require('./db.js');


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



///GET ALLE
app.get('/todos', function(request,response){
    
    
   var query = request.query; //given automatic
   var where = {};
   if(query.hasOwnProperty('completed') && query.completed === 'true')
      where.completed = true;
   else if(query.hasOwnProperty('completed') && query.completed === 'false')
      where.completed = false;
   if(query.hasOwnProperty('q') && query.q.length > 0){

      where.description = {

          $like : '%' + query.q + '%'

      }


   }

   db.todo.findAll({where: where}).then(function(todos){
      var count = Object.keys(todos).length;
      console.log("COUNT " + count);
      response.json(todos);
   }, function(error){
      response.status(500).send('Internal server error');
   });
    
});

//GET BY ID

app.get('/todos/:id', function(request,response){
    
    var todoId = parseInt(request.params.id, 10);
    
    console.log('Asking for todo with id: ' + todoId); //params is short for url paramteres

    db.todo.findById(todoId).then(function(todoItem){
          if(!!todoItem) 
          response.json(todoItem.toJSON());
          else response.status(404).send('id '+ request.params.id + ' not found');

    },

    function(error){
        response.status(500).send(); //error on server (generic)
    }

    );


    
    
});

//POST

app.post('/todos', function(request,response){ //body parser npm needed
    
    var body = _.pick(request.body, 'description', 'completed'); //pick from body only description and completed keys
    
    db.todo.create(body).then(function(todoItem){
        response.json(todoItem.toJSON());
    }, function(errorObject){

       response.status(400).json(errorObject);//send back the error.

    });


  
    
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

app.use(express.static(__dirname + '/public'));
    
    

db.sequelize.sync().then(function(){

    app.listen(PORT, function(){ //callback function
        
        console.log('Express listening on port: ' + PORT);
        
    });


});


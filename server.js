var express = require('express'); // npm modules
var bodyparser = require('body-parser');
var _ = require('underscore'); //similar to linq on C#
var db = require('./db.js');//local file, describing the database and with db object


var app = express(); //start express
var PORT = process.env.PORT || 3000; //environment variable from heroku

app.use(bodyparser.json());



///GET ALLE
app.get('/todos', function(request,response){
    
    
   var query = request.query; //Request objects for HTTP requests have query parameter everytime
   var where = {};//object for storing 'fitering' specifications

   if(query.hasOwnProperty('completed') && query.completed === 'true')
      //if parameter is in the query and check for its value
      where.completed = true;

   else if(query.hasOwnProperty('completed') && query.completed === 'false')

      where.completed = false;

   if(query.hasOwnProperty('q') && query.q.length > 0){ //Also check if param in query is not empty string

      where.description = {

          $like : '%' + query.q + '%' //% are wildcards, LIKE works as in mySQL

      }


   }

   db.todo.findAll({where: where}).then(function(todos){ //success callback. where stores an object with the key value pairs
      var count = Object.keys(todos).length;
      console.log("COUNT " + count); //extra, method to count number of results returned by query

      response.json(todos);

   }, function(error){
      response.status(500).send('Internal server error');
   });
    
});

//GET BY ID

app.get('/todos/:id', function(request,response){ //:id comes as dynamic parameter
    
    var todoId = parseInt(request.params.id, 10);//base 10
    
    console.log('Asking for todo with id: ' + todoId);

    db.todo.findById(todoId).then(function(todoItem){//success callback

          if(!!todoItem)  response.json(todoItem.toJSON());//for us to get all the info back

          else response.status(404).send('id '+ request.params.id + ' not found');

    },

    function(error){
        response.status(500).send(); //error on server (generic)
    }

    );


    
    
});

//POST

app.post('/todos', function(request,response){ //body parser npm needed
    
    var body = _.pick(request.body, 'description', 'completed'); //pick from body only description and completed keys; ignore other key value pairs trying to be sent via HTTP to server
    
    db.todo.create(body).then(function(todoItem){ //success callback

        response.json(todoItem.toJSON());//return what you just posted (not necessary)

    }, function(errorObject){

       response.status(400).json(errorObject);//send back the error.

    });


  
    
});

//DELETE

app.delete('/todos/:id', function(request,response){
    
    var todoId = parseInt(request.params.id, 10);
    
    db.todo.destroy({
      where: {
        id:todoId
      }
    }).then(function(numberOfRows){
      //success callback returns number of rows deleted succesfully
      if(numberOfRows === 0){
        response.status(404).send('ID not found');
      }
      else{
        response.status(204).send(); //204 everything OK, no data to being send back.
      }



    },function(){
      //error callback for promise
      response.status(500).send('Something went wrong on our side');

    });
    
    
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

app.use(express.static(__dirname + '/public')); //client side running on express server (Port PORT)
    
    

db.sequelize.sync().then(function(){//When database is ready, kick off app

    app.listen(PORT, function(){ //callback function
        
        console.log('Express listening on port: ' + PORT);
        
    });


});


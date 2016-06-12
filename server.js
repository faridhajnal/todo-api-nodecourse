var express = require('express'); // npm modules
var bodyparser = require('body-parser');
var _ = require('underscore'); //similar to linq on C#
var db = require('./db.js');//local file, describing the database and with db object
var bcrypt = require('bcryptjs');
var middleware = require('./middleware.js')(db); //self made middle, it is
//a function so we can require it with argument


var app = express(); //start express
var PORT = process.env.PORT || 3000; //environment variable from heroku

app.use(bodyparser.json());



///GET ALLE
app.get('/todos', middleware.requireAuthentication, function(request,response){
    
    
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

   db.todo.findAll({where: where, order: '"id" DESC'}).then(function(todos){ //success callback. where stores an object with the key value pairs
      var count = Object.keys(todos).length;
      console.log("COUNT " + count); //extra, method to count number of results returned by query

      response.json(todos);

   }, function(error){
      response.status(500).send('Internal server error');
   });
    
});

//GET BY ID

app.get('/todos/:id', middleware.requireAuthentication, function(request,response){ //:id comes as dynamic parameter
    
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

app.post('/todos', middleware.requireAuthentication, function(request,response){ //body parser npm needed
    
    var body = _.pick(request.body, 'description', 'completed'); //pick from body only description and completed keys; ignore other key value pairs trying to be sent via HTTP to server
    
    db.todo.create(body).then(function(todoItem){ //success callback

        response.json(todoItem.toJSON());//return what you just posted (not necessary)

    }, function(errorObject){

       response.status(400).json(errorObject);//send back the error.

    });


  
    
});

//DELETE

app.delete('/todos/:id', middleware.requireAuthentication, function(request,response){
    
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

app.put('/todos/:id', middleware.requireAuthentication, function(request,response){ 
    var todoId = parseInt(request.params.id, 10);
    
    
    var body = _.pick(request.body, 'description', 'completed');//only valid fields for json
    var attributes = {}; //empty json object
   
    
    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
        
        attributes.completed = body.completed;
        
    } //boolean method has own property and corresponds to type
    
    if(body.hasOwnProperty('description')){
        
        attributes.description = body.description;
        
    } //boolean method has own property and corresponds to type

    //instance method executed on an already fetched model

    db.todo.findById(todoId).then(function(todo){

        if(todo){

            return todo.update(attributes);

        }

        else{


          response.status(404).send();

        }


    }, function(){ //error...


      response.status(500).send('InternalError');
    //followup to todo.update...
    }).then(function(todo){ //todo with updated attributes


      response.json(todo.toJSON());


    }, function(error){

      response.status(400).json(error);//invalid syntax

    });



});


app.post('/users', function(request,response){ //body parser npm needed
    
    var body = _.pick(request.body, 'email', 'password'); //pick from body only description and completed keys; ignore other key value pairs trying to be sent via HTTP to server
    
    db.user.create(body).then(function(userObject){ //success callback

        response.json(userObject.toPublicJSON());//return what you just posted (not necessary)

    }, function(error){

       response.status(400).json(error);//send back the error.

    });


  
    
});


app.post('/users/login', function(request,response){

  var body = _.pick(request.body, 'email', 'password');


  //implementing class method for calling it from here...


  db.user.authenticate(body).then(function(user){

      response.header('Auth', user.generateToken('authenticate'))
      .json(user.toPublicJSON());//send back user

  }, function(error){ //error callback
      console.log(error);
      response.status(401).send('bad credentials'); //dont care about error itself, and it could provide security issues

  });


});





app.use(express.static(__dirname + '/public')); //client side running on express server (Port PORT)
    
    
//{force:true} when we want to whype db
db.sequelize.sync().then(function(){//When database is ready, kick off app

    app.listen(PORT, function(){ //callback function
        
        console.log('Express listening on port: ' + PORT);
        
    });


});


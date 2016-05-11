var person = {
    
    name: 'Fa',
    age: 22
    
};

function updatePerson(object){
    
    /*object = {
        
        name : 'Fa',
        age : 25
        
    }*/
    
    object.age+=6;
    
    
}

//array example

var grades = [15,80];

function addGrades(sg){
    
    sg.push(55); //modifies the actual value!!
    debugger;//node feature ... to use => node debug program.js
    //cont: moves to next point on code; repl watch variables at certain moment of execution; kill to terminate; quit to stop program
    //sg = [12,14,550]; //separate variable created here, not referenced to the original 
}

addGrades(grades);

console.log(grades);

updatePerson(person);

console.log(person);
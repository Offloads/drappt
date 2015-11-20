//this js file is for API
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));//what does true or false mean here?

app.use(bodyParser.json());

app.use(express.static('public'));
var patientName;
var apptDate;
var apptTime;
var patientEmail;
var PatientAppt = function(){
    this.appts = [];
    this.id = 1;
    };

//I want to add patient booking items in...?
PatientAppt.prototype.addAppt = function(patientName, patientEmail, apptDate, apptTime){
    var  apptObject = { name: patientName, email: patientEmail, date: apptDate, time: apptTime, id: this.id };
    this.appts.push(apptObject);
    this.id += 1;
}

    apptDate = "17/11/15";
    apptTime = "8:00 AM"
var patientAppt = new PatientAppt();
    //patientAppt.addAppt("Nik O'Donnell", apptDate, apptTime);
    //patientAppt.addAppt("Victor", apptDate);
  

    //console.log(patientAppt.appts);

//for (var i =0; i < patientAppt.appts.length; i++){
 //   console.log(patientAppt.appts[i].name, patientAppt.appts[i].date);
//}
    
//GET

app.get('/appts', function(req, res){//creating GET request from url /appts - adding request/response
    res.json(patientAppt.appts);//response
    
});

app.get('/appts/:id', function(req, res){//creating GET by id at url /appts/:id
    var id = parseInt(req.params.id);//id is string, so make integer

//creating a way to check through appointments
    var apptSearch;
        for (var i = 0; i<patientAppt.appts.length; i++)//loop through appointments object
        if (patientAppt.appts[i].id === id){//if the id matches the requested id 
            apptSearch = patientAppt.appts[i];//then make the search value the appointment value
            break;//break out of loop
        } 
        if(!apptSearch){//if there is no apptsearch found
            res.json({ error: "Appointment not found" }); //return error   
        }else{//otherwise
            res.json(apptSearch);//return the appointment values
        } 
    console.log(apptSearch);
});
///GET=working :)

//PUT
//add a PUT method to the API, at url /appt/:id, includes a request/response function.
app.put('/appts/:id', function(req, res){
    //access the patient name (variable already added in global scope) by the name in the body of the request 
    patientName = req.body.name;
    getDate = req.body.date;
    var appt;
    //if no body in request, throw error
    if (!req.body){
        return res.sendStatus(400);
    }
    
    var id = parseInt(req.params.id);//define id, change from string to number
    
    for (var i=0; i <patientAppt.appts.length; i++){//loop through object
        if (patientAppt.appts[i].id === id){//if the id matches the requests, access patientName(defined)
            patientAppt.appts[i].name = patientName;
            
            appts = patientAppt.appts[i];//define appts by i
            
            break;
        }
    }
    //error message:
    if (!appts){
        res.json({error: "Appointment not found"});    
    }else{
        res.json(appt);
    }
});
///PUT=working :)

//POST - need to complete
app.post('/appts', function(req, res){//create POST method

    
    if (!req.body){//if there is nothing in the body, throw error
        return res.sendStatus(400);
    }
    patientName = req.body.name;
    patientEmail = req.body.email;
    apptDate = req.body.date;
    apptTime = req.body.time;
    var appt = patientAppt.addAppt(patientName, patientEmail, apptDate, apptTime);
    
    res.json(appt);
        
});

///POST=worked..kinda - 
//name: patientName, date: apptDate, time: apptTime, id: this.id
//DELETE - need to complete
app.delete('/appts/:id', function (req, res){

    var id = parseInt(req.params.id);
    var apptSearch; 
    var index = -1;
        for(var i = 0; i < patientAppt.appts.length; i++){
            if (patientAppt.appts[i].id === id){//check this with Victor
                patientAppt = patientAppt.appts[i];
                index = i;
                break;
            }
        }
        
        if(!apptSearch){
        
            res.json({error: "This appointment was not found"});
        }else{
            if( index >= 0){
            
                res.json(patientAppt.appts.splice(index, 1));
            }else{
                res.json({error: "invalid index"});
            }
        }

});

///DELETE=!working :(


app.listen(8000, function(req, res){
    console.log("API is running on port 8000");
});



/*
BUGS::

- DELETE doesn't seem to work
- POST works but doesn't give a response message
- 
*/









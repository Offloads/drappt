//use this js file for client interaction
$(function() {
    var currentDate = $( ".selector" ).datepicker( "getDate" );
    $( "#datepicker" ).datepicker();
  });

//creaete POST function
$(function(){
//catch variables
var $appointments = $('#new-appointment');
var $name = $('#patientfirstname');
var $email = $('#patientemail');
var $date = $('#datepicker');
    
    $('#submit-button').on('click', function(e){
        e.preventDefault();
        var appointment = {//build the object
            name: $name.val(),
            email: $email.val(),
            date: $date.val()
        };
    
    $.ajax({
        type: 'POST',
        url: '/appts',
        data: appointment,
        success: function(newAppointment){
            alert("Appointment Made");  //not working?
        },
        
        complete: function(){
            $('#new-appointment').remove();//remove the form
        }
        /*
        error: function(){
            alert(' error saving appointment');
        }*/
        });
    });
});
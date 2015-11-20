//use this js file for client interaction
$(function() {
    var currentDate = $( ".selector" ).datepicker( "getDate" );
    $( "#datepicker" ).datepicker({
        beforeShowDay: $.datepicker.noWeekends
    });
  });

//add jq ui timepicker
$(function(){
    $('input.timepicker').timepicker({
        minTime: '8:00',
        maxHour: 18,
        maxMinutes: 30
    });
});

//creaete POST function
$(function(){
//catch variables
var $appointments = $('#new-appointment');
var $name = $('#patientname');
var $email = $('#patientemail');
var $date = $('#datepicker');
var $time = $('.timepicker');
    
    $('#submit-button').on('click', function(e){
        e.preventDefault();
        var appointment = {//build the object
            name: $name.val(),
            email: $email.val(),
            date: $date.val(),
            time: $time.val()
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


$(function(){
    //variables
    var $doctorAppts = $('#doctor-appts');
    $.ajax({
    
        type: 'GET',
        url: '/appts',
        success: function(appointment){
            $.each(appointment, function(i, appointment){
            
                //append information to somewhere
                $doctorAppts.append('<li>' + 'Name: ' +appointment.name + ' Email: '+ appointment.email + ' Appointment: '+ appointment.date + ' ' + appointment.time + '</li>');
                //var appt = patientAppt.addAppt(patientName, patientEmail, apptDate, apptTime);
            });
            
        },
    });

});


















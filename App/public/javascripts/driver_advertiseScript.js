$(() => {
    $(document).ready(function(){
        $('.check').click(function() {
            $('.check').not(this).prop('checked', false);
        });
    });

    $('#form1').submit((event) => {
        event.preventDefault();

        const s_location =location1();
        const e_location =location2();
        const license_plate = license_plate1();
        const s_date =$('#s_date').val();
        const e_date =$('#e_date').val();
        const s_time =$('#s_time').val();
        const e_time =$('#e_time').val();
        
        const array = {
            s_location,
            e_location,
            license_plate,
            s_date,
            e_date,
            s_time,
            e_time
        };

        advertise(array)
        .then(result => {
            console.log(result);
            window.location = '/driver_advertise';
        }).catch(error => {
            console.error(error);
            const $errorMessage = $('#errorMessage');
            $errorMessage.text(error.responseJSON.message);
            $errorMessage.show(); 
            //window.alert("Invalid account");
        });
    
    });

    //Assign Click event to Button.
    $("#btnGet2").click(function () {
        //Loop through all checked CheckBoxes in GridView.
        $("#dataTable input[type=checkbox]:checked").each(function () {
            const row = $(this).closest("tr")[0];
            const s_date = row.cells[1].innerHTML;
            const e_date = row.cells[2].innerHTML;
            const s_time = row.cells[3].innerHTML;
            const e_time = row.cells[4].innerHTML;
            const s_location = row.cells[5].innerHTML;
            const e_location = row.cells[6].innerHTML;
            const license_plate = row.cells[7].innerHTML;
            const min_bid = row.cells[8].innerHTML; 
            
            const selected_row = {
                s_date,
                e_date,
                s_time,
                e_time,
                s_location,
                e_location,
                license_plate,
                min_bid,
             };
             
            //alert(selected_row.driver_username);
            delete_advertise(selected_row)
            .then(result => {
                console.log(result);
                window.location = '/driver_advertise';
            }).catch(error => { 
                console.error(error);
                const $errorMessage = $('#errorMessage');
                $errorMessage.text(error.responseJSON.message);
                $errorMessage.show(); 
                //window.alert("Invalid account");
            });
        });
    });
    //Assign Click event to Button.
    $("#btnGet3").click(function () {
        //Loop through all checked CheckBoxes in GridView.
        $("#dataTable input[type=checkbox]:checked").each(function () {
            const row = $(this).closest("tr")[0];
            const passenger_username = row.cells[1].innerHTML;
            const s_date = row.cells[2].innerHTML;
            const e_date = row.cells[3].innerHTML;
            const s_time = row.cells[4].innerHTML;
            const e_time = row.cells[5].innerHTML;
            const s_location = row.cells[6].innerHTML;
            const e_location = row.cells[7].innerHTML;
            const license_plate = row.cells[8].innerHTML;
            
            const selected_row = {
                passenger_username,
                s_date,
                e_date,
                s_time,
                e_time,
                s_location,
                e_location,
                license_plate,
             };
             
            //alert(selected_row.driver_username);
            accept_bid(selected_row)
            .then(result => {
                console.log(result);
                window.location = '/driver_advertise';
            }).catch(error => { 
                console.error(error);
                const $errorMessage = $('#errorMessage');
                $errorMessage.text(error.responseJSON.message);
                $errorMessage.show(); 
                //window.alert("Invalid account");
            });
        });
    });
});

function delete_advertise(selected_row) {
    return $.post('http://localhost:3000/driver_advertise/delete_advertise', selected_row);
}

function accept_bid(selected_row) {
    return $.post('http://localhost:3000/driver_advertise/accept_bid', selected_row);
    }

function advertise(array) {
    return $.post('http://localhost:3000/driver_advertise/advertise', array);
}

function location1()
{
  //alert($('#id').val());
  var displaytext = $('#id1').val();
  //alert(displaytext);
  return displaytext;

}

function location2()
{
  //alert($('#id').val());
  var displaytext = $('#id2').val();
  //alert(displaytext);
  return displaytext;

}

function license_plate1()
{
  //alert($('#id').val());
  var displaytext = $('#id3').val();
  //alert(displaytext);
  return displaytext;

}
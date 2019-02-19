var pageCount; //initialising a global variable to save the page Count
var pageCount2;
var Item;
var itemName;
var itemNam;
var item2;
var vehicleName;

// calls at the begining of page loading
$(document).delegate ("#home_page","pageinit", function() {
	//remove location items from the local storage of the web browser
    localStorage.removeItem('location');
});

// call functions at the begining of page loading
$(document).delegate ("#vehicle","pageinit", function() {

    main();


});

$(document).delegate ("#coffee_choice","pageinit", function() {

$("#addmore").hide();
$("#submit").show();
$("#submit").click(function(){
            $("#addmore").show();
            $("#submit").hide();
        });
 $("#addmore").click(function(){
             $("#addmore").hide();
             $("#submit").show();
         });
});

$(document).ready(function(){
	// extract title from local storage
    $("span#CarName").html(localStorage.getItem('CarName'));
    $("span#CoffeeName").html(localStorage.getItem('CoffeeName'));
    //extract the title of the Vehicle from the local storage
 	Item = parseInt(localStorage.getItem("CarNumber"));
 	item2 = parseInt(localStorage.getItem("CoffeeNumber"));
 	//extract the itemNumber of the Vehicle from the local storage
 	itemName = localStorage.getItem("CarName");
 	itemNam = localStorage.getItem("CoffeeName");

	showLogs();

});



// When leaving current page and going to vehicleform
$(document).on("pageshow", "#vehicle", function () {
    clearing();
});

$(document).on("pageshow", "#coffee_choice", function () {
    $("#addmore").hide();
    $("#submit").show();
    $("#submit").click(function(){
                $("#addmore").show();
                $("#submit").hide();
            });
     $("#addmore").click(function(){
                 $("#addmore").hide();
                 $("#submit").show();
             });
});

// the cleaning function is used to clean all the text and values from the fields in the #Vechicle division
	var clearing = function ()

	{
	}


function getID(value)
{
	// initialising a variable to store the type of Vechicle name

	// stores the value comming from the front end to the pageCount variable
	pageCount = value;

	switch (value)
	{
		case 1:
		vehicleName="Coffee Alchemy";
		break;

		case 2:
		vehicleName="Zarraffa's Coffee";
		break;

		case 3:
		vehicleName="Campos Coffee";
		break;
		case 4:
		vehicleName="Cappuccine Australia";
		break;

		case 5:
		vehicleName="Degraves Espresso";
		break;

		default:
		vehicleName = itemName;
		getID(Item);
		break;
	}
		// set text of Vechicle header into local storage variable CarName
		localStorage.setItem("CarName",vehicleName);
		 //set the value if the car number
		localStorage.setItem("CarNumber",value);


		$('span#CarName').text(vehicleName);
		document.getElementById("CarName").innerHTML = vehicleName; //passes the value of the vehicleName variable to the front end division called the CarName
		document.getElementById("CarId").innerHTML = value; //passes the value of the vehicleName variable to the front end division called the CarId
}

function getIDoo(value)
{
	// initialising a variable to store the type of Vechicle name
	var coffeeName;
	// stores the value comming from the front end to the pageCount variable
	pageCount2 = value;

	switch (value)
	{
		case 1:
		coffeeName="EXPRESSO";
		break;

		case 2:
		coffeeName="AMERICANO";
		break;

		case 3:
		coffeeName="MACCHIATO";
		break;
		case 4:
		coffeeName="CAPPUCCINO";
		break;

		case 5:
		coffeeName="LATTE";
		break;

		case 6:
        coffeeName="MOCHA";
        break;

        case 7:
        coffeeName="DOPPIO";
        break;

        case 8:
        coffeeName="GLACE";
        break;

        case 9:
        coffeeName="IRISH";
        break;

		default:
		coffeeName = itemNam;
		getIDoo(Item2);
		break;
	}
		// set text of Vechicle header into local storage variable CarName
		localStorage.setItem("CoffeeName",coffeeName);
		 //set the value if the car number
		localStorage.setItem("CoffeeNumber",value);


		$('span#CoffeeName').text(coffeeName);
		document.getElementById("CoffeeName").innerHTML = coffeeName; //passes the value of the vehicleName variable to the front end division called the CarName
		document.getElementById("CoffeeId").innerHTML = value; //passes the value of the vehicleName variable to the front end division called the CarId
}


function next() // function used to forward the page number
{
	value= pageCount + 1;
	if(value >5)
	{
		value=1;
	}
	clearing();
	getID(value);// calling the getID function again to run the switch case
}

function prev() // function used to backward the page number
{
	value= pageCount - 1;
	if(value <1)
	{
		value=5;
	}
	clearing();
	getID(value);// calling the getID function again to run the switch case
}





// function to save log entries
var main = function ()
{

    $('#vehicle-form').on('submit', function (e)
    {
        e.preventDefault();
        var type = $('span#CarName').text().toLowerCase();

        var Car_items = JSON.parse(localStorage.getItem(type)) || []; // store extracted entries of localstorage in array
        ShopName = document.getElementById("CarName").value;
        CoffeeName = document.getElementById("CoffeeName").value;
		Sugar = document.getElementsByName("Sugar");


	    var itemdata = // array variable to store the date driver name, rego and location

		{   ShopName:$('#CarName').text(),
		    CoffeeName:$('#CoffeeName').text(),
            Sugar:$("input[name=Sugar]:checked").val(),
			strength:$("input[name=strength]:checked").val(),
			quantity:$("input[name=quantity]:checked").val(),
			HaveorTake:$("input[name=havetake]:checked").val(),
			titleid:vehicleName,


        };
					  			alert('Saved to cart');
					  			clearing();



        Car_items.push(itemdata);// push back userinput into array variable itemdata
        localStorage.setItem(type, JSON.stringify(Car_items));//store the user entries ino local storage

    });

};




//display log entries
function showLogs() {
    var type = $('span#CarName').text().toLowerCase();
    var htmlElement = '<ul>';
    logs = JSON.parse(localStorage.getItem(type));
    if (logs) {// if logs exist
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
          for (var i = 0; i < logs.length; i++) {
            htmlElement += '<li id="remove">' +
                 '</br>'

                +'Shop Name: ' + logs[i].ShopName+ '</br>'
                +'Type of Coffee: ' + logs[i].CoffeeName + '</br> '
                +'Number of Sugar Cubes: ' + logs[i].Sugar +'</br> '
                +'Strength of coffee: ' + logs[i].strength +'</br> '
                +'Quantity of coffee: ' + logs[i].quantity +'</br>'
                +'Have here or Take away: ' + logs[i].HaveorTake +'</br>'
                + '</li>'+'<a id="i" + onclick="one(this)" class="remove" data-role="button"> '+ 'Cancel' +'</a>';
        }
    $(".carter").show();
    }

    else {//if no logs found
        htmlElement += '<li>No items in cart.</li>';
        $(".carter").hide();
    }

    htmlElement += '</ul>';
    $('.logs-to-append').html(htmlElement);

};


window.one = function(id){
     var type = $('span#CarName').text().toLowerCase();
    var logs = JSON.parse(localStorage.getItem(type));
        for (var i = 0; i < logs.length; i++) {

              logs.splice(i, 1);
            localStorage.setItem(type, JSON.stringify(logs));
        }


    var item = $(id).prev().andSelf().remove();
    alert("Item Deleted");

}

//function for confirming sending log entries
function myFunction()
{
    if(logs==null)// if no log found
    {
       alert("No Log Found");
    }
    else
    {
        var r = confirm("Are you sure you want to purchase the item?");//display confirm dialog box for asking confirmation to send
        if (r == true)
        {
            if (confirm("Items Purchased") == true)
            {
               storeLogsUsingAjax(logs);
                               var type = $('span#CarName').text().toLowerCase();// set value of Vehicle title to type
                               localStorage.clear();
                               window.location.href = '#home_page';
            }
        }
    }
}

var storeLogsUsingAjax = function (Car_items) {//saving the dataitems of userinput in mongodb
    var ajax = $.ajax({
        url: "http://172.20.10.8:3009/users",
        type: "POST",
        dataType: "json",
        data: {"logs": Car_items}//data send to nodeserver
    });

    ajax.success(function (response) {

        if (response.result === true) {
            alert('Purchase Entry Saved');
            //localStorage.clear();// clearing the items from local storage after storing in mongodb

        }
        console.log(response);
    });

    ajax.fail(function (errorResponse) {
        console.log(errorResponse);
    });
};





var getLogs = function () {// search for the items of selected vehicle from mongodb

    var ajax = $.ajax({
        url: "http://172.20.10.8:3009/search/"+vehicleName,
        type: "POST",

    });

    ajax.success(function (response) {
        if (response.result == true) {
            console.log('ok');
            var type = $('span#CarName').text().toLowerCase();
            var htmlElement = '<ul class="ui-listview">';
            var logs = response.data;

            if (logs) {// if logs exist
                for (var i = 0; i < logs.length; i++) {
                      htmlElement += '<li>' + '</br>'


                          +'Shop Name: ' + logs[i].ShopName+ '</br>'
                          +'Type of Coffee: ' + logs[i].CoffeeName + '</br> '
                          +'Number of Sugar Cubes: ' + logs[i].Sugar +'</br> '
                          +'Strength of coffee: ' + logs[i].strength +'</br> '
                          +'Quantity of coffee: ' + logs[i].quantity +'</br>'
                          +'Have here or Take away: ' + logs[i].HaveorTake +'</br>' + '</li>';
                  }
            } else {//if no logs found
                htmlElement += '<li>No orders yet</li>';
            }

            htmlElement += '</ul>';
            $('.logs-to-append').html(htmlElement);
        }
    });

    ajax.fail(function (errorResponse) {
        console.log(errorResponse);
    });
}


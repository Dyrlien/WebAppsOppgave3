var stations = []; //global container for matches from typeahead
var fromStation; //global variable that stores selected from station
var toStation; //global variable that stores selected to station
var dateLeave; //global variable that stores selected date
var price = 0; //global variable that stores calculated price
var ticketType; //global variable that stores ticket type
var journeyId; //global variable that the id of selected journey
var zones;

$(document).ready(function () {

    orderIdSessionStorage = window.sessionStorage; //makes a sessionstorage to automatically get customers ticketid when redirected to ticket page
    stations = getAllStations(); //gets all stations and sets it to global var
    initTypeaheadForInputFrom(); //intitilizes typeahead for from-station input
    disableViews(); //disables elements that currently not in use
    restrictPastDates(); //restrics dates so you cant order a ticket behind in time
    dateLeave = datesDefaultToday(true); //defaults date variable to todays date
    $("#dateChooserFrom").val(datesDefaultToday(false)); //defaults datechoosers value to today
    ticketType = "voksen"; //initiliaze ticket selection with standard choice
    $("#orderTicket").prop('disabled', true);


    //checks for changes in dates
    $("#dateChooserFrom").change(function (e) { 
        dateLeave = formatDate($("#dateChooserFrom").val());
    });
    //gets ticket type, sets it to global variable
    $('#ticketTypeDropdown').change(function () {
        var selectedItem = $(this).find("option:selected").val();
        ticketType = selectedItem;
    });
    //click button, see what journeys take you from a -> b
    $("#seeJourneys").click(function (e) {
        e.preventDefault();
        getJourneysSelection();

        //just makes the journey list come into view for smaller devices
        setTimeout(function () {
            var scroll = document.getElementById("showJourneysList");
            scroll.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 500);
        
    });
    //click button, creates the order and submits it to db
    $("#orderTicket").click(function (e) {
        e.preventDefault();
        createOrder();
    });

    //------TYPEAHEAD FUNCTIONS--------
    //checks for changes in fromstation input
    $("#inputFromStation").change(function () { //sjekker endringer i tekstfeltet
        if (stations.includes($("#inputFromStation").val())) {
            fromStation = $("#inputFromStation").val();
            $("#inputFromStation").removeClass("is-invalid").addClass("is-valid");
            addStationTo();   
        } else {
            $("#inputFromStation").removeClass("is-valid").addClass("is-invalid");
            disableViews();
        }
    });
    //checks for clicks on the typeahed list for fromstation
    $("#form-group-fromstation .tt-menu").click(function () { 
        if (stations.includes($("#inputFromStation").val())) {
            fromStation = $("#inputFromStation").val();
            $("#inputFromStation").removeClass("is-invalid").addClass("is-valid");
            if (stationToExists()) {
                showViews();
            }
            addStationTo();
        }
    });
    //checks for changes in tostation input
    $(document).on('change', '#inputToStation', (function () { 
        if (stations.includes($("#inputToStation").val())) {
            toStation = $("#inputToStation").val();
            $("#inputToStation").removeClass("is-invalid").addClass("is-valid");
            showViews();
            if (stationToExists()) {
                showViews();
            }
        } else {
            $("#inputToStation").removeClass("is-valid").addClass("is-invalid");

            disableViews();
        }
    }));
    //checks for clicks on the typeahed list for tostation
    $(document).on('click', '#form-group-tostation .tt-menu', (function () { 
        if (stations.includes($("#inputToStation").val())) { 
            toStation = $("#inputToStation").val();
            $("#inputToStation").removeClass("is-invalid").addClass("is-valid");
            showViews();
        }
    }));

    //end for document ready
});


//----------------DISPLAY FUNCTIONS------------

//disables display for elements
function disableViews(){ 
    $("#datesRow").hide();
    $("#seeJourneys").hide();
    $("#showJourneysBody").hide();
    $("#ticketType-formgroup").hide();
}
//shows display for elements
function showViews() {
    $("#datesRow").fadeIn();
    $("#seeJourneys").fadeIn();
    $("#ticketType-formgroup").fadeIn();
}


//----------------DATE FUNCTIONS------------

//liftet from: https://stackoverflow.com/questions/43274559/how-do-i-restrict-past-dates-in-html5-input-type-date/52253447
//restricts dates to current date onwards, disabling previous dates
function restrictPastDates() { 
    $(function () {
        var today = new Date();

        var month = today.getMonth() + 1;
        var day = today.getDate();
        var year = today.getFullYear();
        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        $('#dateChooserFrom').attr('min', maxDate);
    });
}
//makes date default to todays date
function datesDefaultToday(bool) {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    if (bool) {
        return formatDate(today);
    } else {
        return today;
    }
    
}
//formats date to get dd-mm-yyyy instead of yyyy-mmm-dd
function formatDate(date) {
    let split = date.split('-');
    let out = split[2] + "-" + split[1] + "-" + split[0];
    return out;
}



//----------------JOURNEY FUNCTIONS------------

//checks with db if selected from and to stations has a Journey connected to it, if so, display the journeys in a list
function getJourneysSelection() {
    const stations = {
        from: fromStation,
        to: toStation
    };

    $.get("findjourney/GetSelectionOfJourneys", stations, function (output) {
        if (output == "") {
            $("#showJourneysList").html('<h3 class="text-danger">Ingen reiser mellom valgte stasjoner, prøv igjen.</h3>');
            $("#showJourneysBody").fadeIn();
        } else {
            showJourneysListBuilder(output);
        }
 
    });
}
//build output if getJourneySelections is valid
function showJourneysListBuilder(availableJourneys) {
    let stringbuilderStops = "";
    let stringbuilderJourneys = "";
    for (let j of availableJourneys) {
        stringbuilderJourneys += '<a href="#" onclick="showInfo(this.children[4])" class="list-group-item list-group-item-action">';
        //creates the name of the journey with chosen from and to station
        for (let i of j.stopsOnJourneys) { 
            if (i.stations.name == fromStation) {
                stringbuilderJourneys += '<span class="font-weight-bold">' + i.stations.name + '</span> ' + i.arrival + ' <span>&#8594;</span> ';
            } else if (i.stations.name == toStation) {
                stringbuilderJourneys += '<span class="font-weight-bold">' + i.stations.name + '</span> ' + i.arrival + ' (trykk for å se hele reisen)';
            }
        }
        stringbuilderStops = allStopsOnJourneyListBuilder(j.stopsOnJourneys);
        //når man trykker på knappen sendes id-en til reisen gjennom
        stringbuilderJourneys += '<button type="button" onclick="chooseJourney('+j.id+')" class="btn btn-primary float-md-right" >Velg reise</button>' + stringbuilderStops + '</a>';
    }
    stringbuilderJourneys += stringbuilderStops;
    $("#showJourneysList").html(stringbuilderJourneys);
    $("#showJourneysBody").fadeIn();
}
//outputs the list that contains the full journey with all stations inbetween chosen journey
function allStopsOnJourneyListBuilder(stopsOnJourneys) {
    let stringbuilder = '<div class="list-group-item" id="journeyInfo" style="display: none; margin-top: 4ex">';
    let counter = 0;
    for (let i of stopsOnJourneys) {
        counter++;
        if (counter != stopsOnJourneys.length) { //if it's the last station on the list, dont add the arrow :  <span>&#8594;</span>
            if (i.stations.name == fromStation || i.stations.name == toStation) {
                stringbuilder += '<span class="font-weight-bold">' + i.stations.name + '</span> ' + i.arrival + ' <span>&#8594;</span> ';
            } else {
                stringbuilder += i.stations.name + ' ' + i.arrival + ' <span>&#8594;</span> ';
            }
        } else {
            if (i.stations.name == fromStation || i.stations.name == toStation) {
                stringbuilder += '<span class="font-weight-bold">' + i.stations.name + '</span> ' + i.arrival;
            } else {
                stringbuilder += i.stations.name + ' ' + i.arrival;
            }
        }
    } 
    stringbuilder += '</div>';
    return stringbuilder;    
}
//gets all stations for use with the from and to stations inputs, a list for typeahead to match against
function getAllStations() {
    var out = [];
    $.get("findjourney/GetEveryStations", function (output) {

        for (let station of output) {
            out.push(station.name);
        }
        return out;
    });
    return out;
}
//gets the id of the chosen journey from the dynamic list of journeys
function chooseJourney(journeyID) {
    getOneJourney(journeyID);
    $("#orderTicketOverlay").css('width', '100%'); //activates order overlay
    journeyId = journeyID;
}
//gets one journey with price and number of zones, for use with ordering a ticket

function getOneJourney(inId) {

    const journey = { 
        id: inId,
        fromStation: fromStation,
        toStation: toStation,
        ticketType: ticketType
    };
    $.get("findjourney/GetPrice", journey, function (output) {
        price = output;
        $.get("findjourney/GetNumberOfZones", journey, function (output) {
            zones = output;
            orderSummary();
        });
    });
    
    
}
//opens up the display that shows the full journey with all stations
function showInfo(e) {
    if (e.style.display == "none") {
        $(e).css('display', 'block');
    } else {
        $(e).css('display', 'none');
    }

}
//workaround for from station inputs .change  to check if station to input exist
function stationToExists() {
    if ($("#inputToStation").length) {
        return true;
    } else {
        return false;
    }
}
//displays stationTo input when stationFrom is ok
function addStationTo() {

    if ($("#inputToStation").length) { //checks if #inputToStation exsists
        return false;
    } else {
        $("#form-group-tostation").append('<h3>Til</h3><input id="inputToStation" class="form-control form-control-lg" type="text" placeholder="Eks. Oslo lufthavn Gardermoen" />');
        initTypeaheadForInputTo();
    }
}

//----------------ORDER FUNCTIONS------------

//deactivates order overlay
function closeOrderTicketOverlay() {
    $("#orderTicketOverlay").css('width', '0%'); 
}

//creates the summary of the order
function orderSummary() {
    let stringBuilder = "<thead>";
    stringBuilder += '<tr><th scope="col">Fra</th><th scope="col">Til</th><th scope="col">Pris</th></tr></thead>';
    stringBuilder += '<tbody><tr><td>' + fromStation + '</td><td>' + toStation + '</td><td>' + price + '</td></tbody>'
    $('#informationTable').html(stringBuilder);
}
//creates the order and redirects customer to their ticket
function createOrder() {
    var today = datesDefaultToday();
    today = formatDate(today);

    const personaliaOK = validerPersonalia();
    if (personaliaOK) {
        const order = {
            journeyId: journeyId,
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            tlf: $("#tlf").val(),
            fromStation: fromStation,
            toStation: toStation,
            leaveDate: dateLeave,
            type: ticketType,
            price: price,
            orderDate: today,
            zones: zones
        };
        $.get("findjourney/CreateNewOrder", order, function (output) {
            if (output >= 0) {
                alert("Kjøpet var vellykket! Du sendes nå til din billett.");
                sessionStorage.setItem('orderid', output); //stores order id in session, so when redirected it automatically gets customers order and ticket
                window.location.replace("order.html");
            } else {
                alert("Kjøpet kunne ikke gjennomføres. Prøv igjen.");
            }
        });
    }
}


//----------TYPEAHEAD FUNCTIONS-------------

function initTypeaheadForInputTo() {
    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            matches = [];

            substrRegex = new RegExp(q, 'i');

            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }

            });

            cb(matches);
        };
    };

    $("#inputToStation").typeahead({
        hint: false,
        highlight: true,
        minLength: 1
    },
        {
            name: 'stations',
            source: substringMatcher(stations)
        }
    );
    $(".twitter-typeahead").css("display", "block"); //fixes layout problem where inputs becomes too small

}


function initTypeaheadForInputFrom() {
    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            matches = [];

            substrRegex = new RegExp(q, 'i');


            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }

            });

            cb(matches);
        };
    };

    $("#inputFromStation").typeahead({
        hint: false,
        highlight: true,
        minLength: 1
    },
        {
            name: 'stations',
            source: substringMatcher(stations)
        }
    );

    $(".twitter-typeahead").css("display", "block"); //fixes layout problem where inputs becomes too small

}



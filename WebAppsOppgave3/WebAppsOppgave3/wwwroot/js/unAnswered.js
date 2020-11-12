var allQuestions = [];
var ticketQuestions = [];
var journeyQuestions = [];
var luggageQuestions = [];
var coronaQuestions = [];

$(document).ready(function () {   
    getUnansweredQuestions();
     
});

function getUnansweredQuestions() {
    $.get("FAQ/GetUnansweredQuestions", function (output) {
        console.log(output);
        listUnansweredQuestions(output);
    });
}

function listUnansweredQuestions(unansweredQuestions) {
    for (var q of unansweredQuestions) {
        allQuestions.push(q);
        if (q.category === "Billett") {
            ticketQuestions.push(q);
        }
        else if(q.category ==="Reise"){
            journeyQuestions.push(q);
        }
        else if (q.category === "Bagasje") {
            luggageQuestions.push(q);
        }
        else if (q.category === "Korona") {
            coronaQuestions.push(q);
        }
    }    
}
function getTicketQuestions() {
    stringbuilderTickets = "";
    ticketQuestions.forEach(element => stringbuilderTickets += '<div class="row"><h5 class="card-title col">' + element.firstName + '</h5><h5 class="col text-right">' + element.category + '</h5></div>'
        + '<h6 class="card-subtitle text-muted">' + element.customerQuestion + '</h6>'
        + '<form><div class="form-group"><input type="text" id="'+element.id+'" class="form-control "/></div>'
        + '<div class="form-group"><button type="button" id="regAnswer" class="btn btn-outline-primary form-control" onclick="regAnsweredQuestion(' + element.id +')">Registrer svar</button></div></form>');
    $("#questionsList").html(stringbuilderTickets);
}

function getJourneyQuestions() {
    stringbuilderJourney = "";
    journeyQuestions.forEach(element => stringbuilderJourney += '<div class="row"><h5 class="card-title col">' + element.firstName + '</h5><h5 class="col text-right">' + element.category + '</h5></div>'
        + '<h6 class="card-subtitle text-muted">' + element.customerQuestion + '</h6>'
        + '<form><div class="form-group"><input type="text" id="' + element.id + '" class="form-control "/></div>'
        + '<div class="form-group"><button type="button" id="regAnswer" class="btn btn-outline-primary form-control" onclick="regAnsweredQuestion(' + element.id + ')">Registrer svar</button></div></form>');
    $("#questionsList").html(stringbuilderJourney);
}

function getLuggageQuestions() {
    stringbuilderLuggage = "";
    luggageQuestions.forEach(element => stringbuilderLuggage += '<div class="row"><h5 class="card-title col">' + element.firstName + '</h5><h5 class="col text-right">' + element.category + '</h5></div>'
        + '<h6 class="card-subtitle text-muted">' + element.customerQuestion + '</h6>'
        + '<form><div class="form-group"><input type="text" id="' + element.id + '" class="form-control "/></div>'
        + '<div class="form-group"><button type="button" id="regAnswer" class="btn btn-outline-primary form-control" onclick="regAnsweredQuestion(' + element.id + ')">Registrer svar</button></div></form>');
    $("#questionsList").html(stringbuilderLuggage);
}

function getCoronaQuestions() {
    stringbuilderCorona = "";
    coronaQuestions.forEach(element => stringbuilderCorona += '<div class="row"><h5 class="card-title col">' + element.firstName + '</h5><h5 class="col text-right">' + element.category + '</h5></div>'
        + '<h6 class="card-subtitle text-muted">' + element.customerQuestion + '</h6>'
        + '<form><div class="form-group"><input type="text" id="' + element.id + '" class="form-control "/></div>'
        + '<div class="form-group"><button type="button" id="regAnswer" class="btn btn-outline-primary form-control" onclick="regAnsweredQuestion(' + element.id + ')">Registrer svar</button></div></form>');
    $("#questionsList").html(stringbuilderCorona);
}

function regAnsweredQuestion(elementId) {

    var element = allQuestions.find(oneElement => oneElement.id === elementId);
    console.log(elementId);

    const oneCategory = {
        categoryName: element.category
    };
    
    const answeredQuestion = {
        firstName: element.firstName,
        email: element.email,
        customerQuestion: element.customerQuestion,
        customerAnswer: document.getElementById(element.id).value,
        category: oneCategory
    };
    const deleteQuestion = {
        id: elementId,
        firstName: element.firstName,
        email: element.email,
        customerQuestion: element.customerQuestion,        
        category: element.categoryName
    }
    console.log(oneCategory.categoryName);
    console.log(answeredQuestion.customerAnswer);
    $.post("FAQ/RegAnsweredQuestion", answeredQuestion, function (output) {
        console.log(output);
    });
    $.post("FAQ/DeleteAnsweredQuestion", deleteQuestion, function(output1) {
        alert(output1)
        clearLists();
        getUnansweredQuestions();
    });    
}

function clearLists() {
    allQuestions = [];
    ticketQuestions = [];
    journeyQuestions = [];
    luggageQuestions = [];
    coronaQuestions = [];
}



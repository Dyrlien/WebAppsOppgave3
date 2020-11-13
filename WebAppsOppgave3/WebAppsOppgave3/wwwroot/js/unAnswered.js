var allQuestions = [];
var ticketQuestions = [];
var journeyQuestions = [];
var luggageQuestions = [];
var coronaQuestions = [];
var currentList = "Billett";

$(document).ready(function () {   
    $('#updateCurrentList').click(function (e) {
        e.preventDefault();
        updateList(currentList)
    });
    getUnansweredQuestions("Billett");
     
});

function getUnansweredQuestions(categoryName) {
    $.get("FAQ/GetUnansweredQuestions", function (output) {
        console.log(output);
        listUnansweredQuestions(output, categoryName);
    });
}

function listUnansweredQuestions(unansweredQuestions, categoryName) {
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
    updateList(categoryName);
}
function getTicketQuestions() {
    stringbuilderTickets = "";
    ticketQuestions.forEach(element => stringbuilderTickets += '<div class="row"><h5 class="card-title col">' + element.firstName + '</h5><h5 class="col text-right">' + element.category + '</h5></div>'
        + '<h6 class="card-subtitle text-muted">' + element.customerQuestion + '</h6>'
        + '<form><div class="form-group"><input type="text" id="'+element.id+'" class="form-control "/></div>'
        + '<div class="form-group container row"><button type="button" id="regAnswer" class="btn btn-outline-primary form-control col-3 " onclick="regAnsweredQuestion(' + element.id + ')">Registrer svar</button>'
        + '<button type="button" class="btn btn-outline-danger form-control col-3 mleft" onclick="deleteQuestion(' + element.id + ')">Slett spørsmål</button></div ></form > ');
    $("#questionsList").html(stringbuilderTickets);
    currentList = "Billett";
}

function getJourneyQuestions() {
    stringbuilderJourney = "";
    journeyQuestions.forEach(element => stringbuilderJourney += '<div class="row"><h5 class="card-title col">' + element.firstName + '</h5><h5 class="col text-right">' + element.category + '</h5></div>'
        + '<h6 class="card-subtitle text-muted">' + element.customerQuestion + '</h6>'
        + '<form><div class="form-group"><input type="text" id="' + element.id + '" class="form-control "/></div>'
        + '<div class="form-group container row"><button type="button" id="regAnswer" class="btn btn-outline-primary form-control col-3 " onclick="regAnsweredQuestion(' + element.id + ')">Registrer svar</button>'
        + '<button type="button" class="btn btn-outline-danger form-control col-3 mleft" onclick="deleteQuestion(' + element.id + ')">Slett spørsmål</button></div ></form > ');
    $("#questionsList").html(stringbuilderJourney);
    currentList = "Reise";    
}

function getLuggageQuestions() {
    stringbuilderLuggage = "";
    luggageQuestions.forEach(element => stringbuilderLuggage += '<div class="row"><h5 class="card-title col">' + element.firstName + '</h5><h5 class="col text-right">' + element.category + '</h5></div>'
        + '<h6 class="card-subtitle text-muted">' + element.customerQuestion + '</h6>'
        + '<form><div class="form-group"><input type="text" id="' + element.id + '" class="form-control "/></div>'
        + '<div class="form-group container row"><button type="button" id="regAnswer" class="btn btn-outline-primary form-control col-3 " onclick="regAnsweredQuestion(' + element.id + ')">Registrer svar</button>'
        + '<button type="button" class="btn btn-outline-danger form-control col-3 mleft" onclick="deleteQuestion(' + element.id + ')">Slett spørsmål</button></div ></form > ');
    $("#questionsList").html(stringbuilderLuggage);
    currentList = "Bagasje";
}

function getCoronaQuestions() {
    stringbuilderCorona = "";
    coronaQuestions.forEach(element => stringbuilderCorona += '<div class="row"><h5 class="card-title col">' + element.firstName + '</h5><h5 class="col text-right">' + element.category + '</h5></div>'
        + '<h6 class="card-subtitle text-muted">' + element.customerQuestion + '</h6>'
        + '<form><div class="form-group"><input type="text" id="' + element.id + '" class="form-control "/></div>'
        + '<div class="form-group container row"><button type="button" id="regAnswer" class="btn btn-outline-primary form-control col-3 " onclick="regAnsweredQuestion(' + element.id + ')">Registrer svar</button>'
        + '<button type="button" class="btn btn-outline-danger form-control col-3 mleft" onclick="deleteQuestion(' + element.id + ')">Slett spørsmål</button></div ></form > ');
    $("#questionsList").html(stringbuilderCorona);
    currentList = "Korona";
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
    
    console.log(oneCategory.categoryName);
    console.log(answeredQuestion.customerAnswer);
    $.post("FAQ/RegAnsweredQuestion", answeredQuestion, function (output) {
        console.log(output);
        deleteQuestion(elementId);
    });
    
   
}

function deleteQuestion(elementId) {
    var element = allQuestions.find(oneElement => oneElement.id === elementId);
    console.log(element.category);
    const deleteQuestion = {
        id: elementId,
        firstName: element.firstName,
        email: element.email,
        customerQuestion: element.customerQuestion,
        category: element.category
    }
    $.post("FAQ/DeleteAnsweredQuestion", deleteQuestion, function (output) {
        console.log(output);
        clearLists();
        getUnansweredQuestions(element.category);        
    });    
    
}
function clearLists() {
    allQuestions = [];
    ticketQuestions = [];
    journeyQuestions = [];
    luggageQuestions = [];
    coronaQuestions = [];
}

function updateList(categoryName) {
    
    switch (categoryName) {
        case "Billett":
            getTicketQuestions();
            break;
        case "Reise":
            getJourneyQuestions();
            break;
        case "Bagasje":
            getLuggageQuestions();
            break;
        case "Korona":
            getCoronaQuestions();
            break;
    }
}



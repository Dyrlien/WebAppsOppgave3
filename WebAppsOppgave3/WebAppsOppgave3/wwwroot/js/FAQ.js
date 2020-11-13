var allCategories = [];
var allQuestions = [];
var questionIdVar = 0;
var upvoteVar = 0;
var downvoteVar = 0;


$(document).ready(function () {
    $('#regNewQuestion').click(function (e) {
        e.preventDefault();
        registerNewQuestion();
    });
    /*
    $('#clickUpvote').click(function (e) {
        e.preventDefault();
        upvoteClicked();
    });
    $('#clickDownvote').click(function (e) {
        e.preventDefault();
        downvoteClicked();
    });
    */

    getAllCategories();
    getAllQuestions(1);
    getSelectedQuestion(1);
    getCustomerQuestions();

});

//Aquires all categories from the database
function getAllCategories() {
    $.get("FAQ/GetEveryCategories", function (output) {
        allCategories = output;        
        printAllCategories(output);
    });
}

//Prints all Categories to the interface
function printAllCategories(categories) {
    let stringbuilderCategories = '<h4>Kategorier</h4><ul class="list-group">';
    categories.forEach(element => stringbuilderCategories += '<li class="list-group-item" onclick="getAllQuestions('
        + element.id + ')"><h5>' + element.categoryName + '</h5></li>');
    stringbuilderCategories += '</ul>';    
    $("#FAQCategories").html(stringbuilderCategories);
}

function getAllQuestions(categoryId) {
    $.get("FAQ/GetEveryQuestion", function (output) {
        allQuestions = output;
        getSelectedCategory(output, categoryId);
    });
}

function getSelectedCategory(questions, categoryId) {
    let stringbuilderQuestions = '<h4>Spørsmål</h4><ul class="list-group">';
    for (let q of questions) {
        if (q.category.id === categoryId) {
            stringbuilderQuestions += '<li class="list-group-item" onclick="getSelectedQuestion('
                + q.id + ')"><h6>' + q.question + '</h6></li>';
        }
    }    
    stringbuilderQuestions += '</ul>';
    $("#FAQQuestions").html(stringbuilderQuestions);
}

function getSelectedQuestion(questionId) {    
    $.get("FAQ/GetEveryQuestion", function (output) {
        answerElement = output.find(element => element.id == questionId);
        printSelectedAnswer(answerElement.answer);
        questionIdVar = questionId;
        enableVotes();
        printUpvotes(answerElement.upvote);
        printDownvotes(answerElement.downvote);
    });
}

function printSelectedAnswer(answer) {
    let stringbuilderAnswer = '<p>' + answer + '</p>';
    $("#FAQAnswer").html(stringbuilderAnswer);
}

function printUpvotes(upvote) {
    upvoteVar = upvote;
    $("#upvote").text(upvoteVar);    
}
function printDownvotes(downvote) {    
    downvoteVar = downvote;
    $("#downvote").text(downvoteVar);
}

function upvoteClicked() {  
    disableVotes();
    upvoteVar++;
    printUpvotes(upvoteVar);
    updateVoteDb();
}
function downvoteClicked() {  
    disableVotes();
    downvoteVar++;
    printDownvotes(downvoteVar);
    updateVoteDb();
}

function disableVotes() {
    stringbuilderUpvote = '<i class="fas fa-thumbs-up questionNavPx"></i>';
    $('#upvoteDiv').html(stringbuilderUpvote);
    stringbuilderDownvote = '<i class="fas fa-thumbs-down questionNavPx"></i>';
    $('#downvoteDiv').html(stringbuilderDownvote);
}
function enableVotes() {
    stringbuilderUpvote = '<i class="far fa-thumbs-up questionNavPx" onclick="upvoteClicked()"></i>';
    $('#upvoteDiv').html(stringbuilderUpvote);
    stringbuilderDownvote = '<i class="far fa-thumbs-down questionNavPx" onclick="downvoteClicked()"></i>';
    $('#downvoteDiv').html(stringbuilderDownvote);
}

function updateVoteDb() {
    element = allQuestions.find(element => element.id == questionIdVar);
    const oneCategory = {
        categoryName: element.category
    };
    const aQuestion = {
        id: questionIdVar,
        upvote: upvoteVar,
        downvote: downvoteVar,
        question: element.question,
        answer: element.answer,
        category: oneCategory
    };
    $.post("FAQ/UpdateVotes", aQuestion, function (output) {
        alert(output);
    });
}


//OVERLAY
function openQuestionOverlay() {
    $("#questionOverlay").css('width', '100%');
}
function closeQuestionOverlay() {
    $("#questionOverlay").css('width', '0%');
}

function registerNewQuestion() {
    const aQuestion = {
        firstName: $('#inputFirstname').val(),
        email: $('#inputEmail').val(),
        customerQuestion: $('#inputQuestion').val(),
        category: $('#selectedCategory').val()
    };
    $.post("FAQ/RegisterNewQuestion", aQuestion, function (output) {
        closeQuestionOverlay();
        getCustomerQuestions();
        clearInputFields();
    });
}

function clearInputFields() {
    document.getElementById("inputFirstname").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("selectedCategory").value = "";
    document.getElementById("inputQuestion").value = "";

}

function getCustomerQuestions() {
    $.get("FAQ/GetEveryCustomerQuestion", function (output) {
        printCustomerQuestions(output);
    });
}

function printCustomerQuestions(customerQuestions) {
    let stringbuilderCustomerQuestions = '';
    customerQuestions.forEach(element => stringbuilderCustomerQuestions
        += '<div class="row"><h5 class="card-title col">' + element.firstName + '</h5><h5 class="col text-right">' + element.category.categoryName + '</h5></div>'
        + '<h6 class="card-subtitle text-muted">' + element.customerQuestion + '</h6>'
        + '<p class="customerQuestions">' + element.customerAnswer + '</p>');
    console.log(stringbuilderCustomerQuestions);
    $("#userQuestions").html(stringbuilderCustomerQuestions);
}


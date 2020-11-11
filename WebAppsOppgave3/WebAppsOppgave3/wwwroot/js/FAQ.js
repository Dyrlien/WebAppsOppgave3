var allCategories = [];
var allQuestions = [];


$(document).ready(function () {
    getAllCategories();
    getAllQuestions(1);
    getSelectedQuestion(1);
});

//Aquires all categories from the database
function getAllCategories() {    
    $.get("FAQ/GetEveryCategories", function (output) {        
        
        allCategories = output;
        console.log(allCategories.toString());
        printAllCategories(output);
    });
}

//Prints all Categories to the interface
function printAllCategories(categories) {    
    let stringbuilderCategories = '<h4>Kategorier</h4><ul class="list-group">';
    categories.forEach(element => stringbuilderCategories += '<li class="list-group-item" onclick="getAllQuestions('
        + element.id + ')"><h5>' + element.categoryName + '</h5></li>');
    stringbuilderCategories += '</ul>';
    console.log(stringbuilderCategories);
    $("#FAQCategories").html(stringbuilderCategories);    
}

function getAllQuestions(categoryId) {
    $.get("FAQ/GetEveryQuestion", function (output) {
        console.log(output);
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
    console.log(stringbuilderQuestions);
    stringbuilderQuestions += '</ul>';
    $("#FAQQuestions").html(stringbuilderQuestions);
}

function getSelectedQuestion(questionId) {
    let answer;
    $.get("FAQ/GetEveryQuestion", function (output) {
        answerElement = output.find(element => element.id == questionId);
        printSelectedAnswer(answerElement.answer);
    });
}

function printSelectedAnswer(answer) {
    let stringbuilderAnswer = '<p>' + answer + '</p>';
    $("#FAQAnswer").html(stringbuilderAnswer);
    
}

//OVERLAY
function openQuestionOverlay() {
    $("#questionOverlay").css('width', '100%');
}
function closeQuestionOverlay() {
    $("#questionOverlay").css('width', '0%');
}
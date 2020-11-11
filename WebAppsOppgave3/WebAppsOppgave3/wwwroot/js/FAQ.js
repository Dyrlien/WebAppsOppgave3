var allCategories = [];
var allQuestions = [];

$(document).ready(function () {
    getAllCategories();
});

//Aquires all categories from the database
function getAllCategories() {    
    $.get("FAQ/GetEveryCategories", function (output) {        
        console.log(output);
        printAllCategories(output);
    });
}

//Prints all Categories to the interface
function printAllCategories(categories) {    
    let stringbuilderCategories = '<ul class="list-group">';
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
    let stringbuilderQuestions = '<ul class="list-group">';
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
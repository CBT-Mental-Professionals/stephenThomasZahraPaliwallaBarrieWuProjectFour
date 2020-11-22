// create name space for App
const cbtApp = {};

// create an array or object of scores 
cbtApp.scoreData = [];

cbtApp.answerKey = {
    "question1": [
        -1,
        0,
        1
    ],
    "question2": [
        -1,
        0,
        1
    ],
    "question3": [
        1,
        -1
    ]
}

cbtApp.textToDisplay = {
    h1: [
        'fuck off',
        'nice to see you',
        'arr me matey'
    ],
    h2: [
        'hello',
        'hi',
        'testing'
    ]
}


cbtApp.skinListener = () => {
    $('.skinSelect').on('click', function() {
        let skin = $(this).val();
        for (i in cbtApp.textToDisplay) {
            $(i).text(cbtApp.textToDisplay[i][skin]);
        }
    })
}


cbtApp.resultsToDisplay = {
    bad: `<img src="assets/stephen.png" alt="Stephen with a stern look on his face">
    <p> You suck </p>`,
    ok: `<img src="assets/barrie.png" alt="Barrie with a hesistant but friendly face">
    <p> You ok </p>`,
    good: `
    <img src="assets/zahra.png" alt="Zahra with a friendly face">
    <p> You good </p>`
}


// make function to store radio responses in variables
cbtApp.getFormResponses = () => {
    // store radio checked data
    cbtApp.userQuestionOneAnswer = $('input[name=questionOneAnswer]:checked').val();
    cbtApp.userQuestionTwoAnswer = $('input[name=questionTwoAnswer]:checked').val();
    cbtApp.userQuestionThreeAnswer = $('input[name=questionThreeAnswer]:checked').val();
    console.log(cbtApp.userQuestionOneAnswer, cbtApp.userQuestionTwoAnswer, cbtApp.userQuestionThreeAnswer); 
    cbtApp.userTextAreaAnswer = $('textarea').val();
    console.log(cbtApp.userTextAreaAnswer);

    cbtApp.questionOneValue = cbtApp.answerKey.question1[cbtApp.userQuestionOneAnswer];
    console.log(`cbtApp.questionOneValue is`, cbtApp.questionOneValue);
    cbtApp.questionTwoValue = cbtApp.answerKey.question2[cbtApp.userQuestionTwoAnswer];
    console.log(`cbtApp.questionTwoValue is`, cbtApp.questionTwoValue);
    cbtApp.questionThreeValue = cbtApp.answerKey.question3[cbtApp.userQuestionThreeAnswer];
    console.log(`cbtApp.questionThreeValue is`, cbtApp.questionThreeValue);

    
}

// testing out text area error handling

cbtApp.textAreaCounter = () => {
    $('textarea').bind('input propertychange', function () {
        let $textAreaNumber = $(this).val().length;
        console.log($textAreaNumber)
        if ($textAreaNumber === 10){
            $('.errorMessage').text( `...keep typing`)
        } else if ($textAreaNumber === 20){
            $('.errorMessage').toggleClass('rotate')

        } else if ($textAreaNumber === 25) {
            $('.errorMessage').toggleClass('rotate')
        } else if ($textAreaNumber === 30) {
            $('.errorMessage').toggleClass('rotate')
        }
    })
}




cbtApp.addFormResponses = () => {
    cbtApp.addedFormResponses = (cbtApp.questionOneValue + cbtApp.questionTwoValue + cbtApp.questionThreeValue + cbtApp.polarity) / 4;
    console.log(cbtApp.addedFormResponses)
} 

cbtApp.numberToResult = () => {
    $('.answer').empty();
    if (cbtApp.addedFormResponses < -0.3){
        let resultDisplay = `${cbtApp.resultsToDisplay.bad}`;
        $('.answer').append(resultDisplay)
    } else if (cbtApp.addedFormResponses >= -0.3 && cbtApp.addedFormResponses <= 0.3) {
        let resultDisplay = `${cbtApp.resultsToDisplay.ok}`;
        $('.answer').append(resultDisplay)
    } else {
        let resultDisplay = `${cbtApp.resultsToDisplay.good}`;
        $('.answer').append(resultDisplay)
    };    
    console.log(resultDisplay);
} 

// storing API Url in variable 
cbtApp.apiUrl = "https://sentim-api.herokuapp.com/api/v1/";

// creating a function to call the API
cbtApp.sentimApiCall = (textAreaInput) => {
    // storing the data from the API call in a variable
    cbtApp.sentimPromise = $.ajax({
            url: cbtApp.apiUrl,
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify({text:`${textAreaInput}`}),
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"  
        }
    });
    
    // console.log(`testing this has worked`);
    // console.log(cbtApp.sentimPromise);
    // return cbtApp.sentimPromise;
    // return cbtApp.polarity;
    // console.log(`2nd cbtApp.polarity log outside all the API functions`, cbtApp.polarity);
}



cbtApp.getResults = () => {
    // listen to form submit
    $('form').on('submit', function (e) {
        e.preventDefault();
        // add up the radio button responses in conjunction with scores obj/arr
        cbtApp.getFormResponses();
        // send textarea response to API
        cbtApp.sentimApiCall(cbtApp.userTextAreaAnswer);
        // combine radio data with textarea sentiment response

        // display result(s) to (new) page
        $.when(cbtApp.sentimPromise)
            .then((res) => {
                cbtApp.polarity = res.result.polarity;
                console.log(`cbtApp.polarity at the bottom`, cbtApp.polarity);
                cbtApp.addFormResponses();
                cbtApp.numberToResult();
            });
    });
}


cbtApp.goDownToNextQuestion = () => {
    // listen to radio buttons being selected
    $('.questionOneAnswer').on('click', function () {
        setTimeout(function () {
            console.log(`something has been checked`);
            $('html, body').animate({
                scrollTop: $(".questionSection2").offset().top
            }, 400);
        }, 200);
    });
    $('.questionTwoAnswer').click(function () {
        setTimeout(function () {
            console.log(`something has been checked`);
            $('html, body').animate({
                scrollTop: $(".questionSection3").offset().top
            }, 400);
        }, 200);
    });
    $('.questionThreeAnswer').click(function () {
        setTimeout(function () {
            console.log(`something has been checked`);
            $('html, body').animate({
                scrollTop: $(".questionSection4").offset().top
            }, 400);
        }, 200);
    });
    $('form').on('submit', function (e) {
        e.preventDefault();
        // animate the button TODO
        // $(this).transform
        // expand results section (experimental) 
        // $('.results').css({ display: 'initial' }, 0);
        $('.results').show();
        // navigate down to results
        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $(".results").offset().top
            }, 400);
        }, 300);
    });
};


// INIT
cbtApp.init = () => {
    cbtApp.goDownToNextQuestion();
    cbtApp.getResults();
    cbtApp.textAreaCounter();
    cbtApp.skinListener();
};

// DOC READY
$(function(){
    cbtApp.init();
});


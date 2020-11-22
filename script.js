// create name space for App
const cbtApp = {};

// storing API Url in variable 
cbtApp.apiUrl = "https://sentim-api.herokuapp.com/api/v1/";

// create an object with array of scores per question 
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

cbtApp.answerKeyIcons = {
    "question1": [
        '⭐️',
        '⭐️⭐️',
        '⭐️⭐️⭐️'
    ],
    "question2": [
        '⭐️',
        '⭐️⭐️',
        '⭐️⭐️⭐️'
    ],
    "question3": [
        '✅',
        '❎'
    ]
}

// *******************  BEFORE FORM SUBMIT   ******************* START


// obj w/ result properties to append to final results
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
    <p> Sleep: ${cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer]} Meals: ${cbtApp.answerKeyIcons.question2[cbtApp.userQuestionTwoAnswer]} Activity: ${cbtApp.answerKeyIcons.question3[cbtApp.userQuestionThreeAnswer]}</p>
    <p> Stephen loves you! </p>`,
    ok: `<img src="assets/barrie.png" alt="Barrie with a hesistant but friendly face">
    <p> Sleep: ${cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer]} Meals: ${cbtApp.answerKeyIcons.question2[cbtApp.userQuestionTwoAnswer]} Activity: ${cbtApp.answerKeyIcons.question3[cbtApp.userQuestionThreeAnswer]}</p>
    <p> Thumbs up from Barrie! </p>`,
    good: `
    <img src="assets/zahra.png" alt="Zahra with a friendly face">
    <p> Sleep: ${cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer]} Meals: ${cbtApp.answerKeyIcons.question2[cbtApp.userQuestionTwoAnswer]} Activity: ${cbtApp.answerKeyIcons.question3[cbtApp.userQuestionThreeAnswer]}</p>
    <p> Zahra's got your back! </p>`
}


// make function to store radio responses in variables
cbtApp.getFormResponses = () => {
    // getting the radio answer value="(0, 1, or 2)"
    cbtApp.userQuestionOneAnswer = $('input[name=questionOneAnswer]:checked').val();
    cbtApp.userQuestionTwoAnswer = $('input[name=questionTwoAnswer]:checked').val();
    cbtApp.userQuestionThreeAnswer = $('input[name=questionThreeAnswer]:checked').val();
    console.log(cbtApp.userQuestionOneAnswer, cbtApp.userQuestionTwoAnswer, cbtApp.userQuestionThreeAnswer); 
    // store text area data
    cbtApp.userTextAreaAnswer = $('textarea').val();
    console.log(cbtApp.userTextAreaAnswer);

    // translate value="(0, 1, or 2") to cbt.answerKey score array [-1, 0, 1]
    cbtApp.questionOneValue = cbtApp.answerKey.question1[cbtApp.userQuestionOneAnswer];
    console.log(`cbtApp.questionOneValue is`, cbtApp.questionOneValue);
    cbtApp.questionTwoValue = cbtApp.answerKey.question2[cbtApp.userQuestionTwoAnswer];
    console.log(`cbtApp.questionTwoValue is`, cbtApp.questionTwoValue);
    cbtApp.questionThreeValue = cbtApp.answerKey.question3[cbtApp.userQuestionThreeAnswer];
    console.log(`cbtApp.questionThreeValue is`, cbtApp.questionThreeValue);
}


// error handling for textarea
// notification/encouragement for user input min textarea requirement
cbtApp.textAreaCounter = () => {
    $('textarea').bind('input propertychange', function () {
        let $textAreaNumber = $(this).val().length;
        console.log($textAreaNumber)
        if ($textAreaNumber === 10){
            $('.errorMessaging').text( `...keep typing... 10 characters to go`)
        } else if ($textAreaNumber === 20){
            $('.errorMessaging').toggleClass('rotate')
        } else if ($textAreaNumber === 25) {
            $('.errorMessaging').toggleClass('rotate')
        } else if ($textAreaNumber === 30) {
            $('.errorMessaging').toggleClass('rotate')
        }
    })
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
};



// *******************  BEFORE FORM SUBMIT   ******************* END



// *******************  AFTER FORM SUBMIT   ******************* START


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

// add user choice radio values with sentimApi return value from  textarea
cbtApp.addFormResponses = () => {
    cbtApp.addedFormResponses = (cbtApp.questionOneValue + cbtApp.questionTwoValue + cbtApp.questionThreeValue + cbtApp.polarity) / 4;
    console.log(cbtApp.addedFormResponses)
} 

cbtApp.getResults = () => {
    // listen to form submit
    $('form').on('submit', function (e) {
        e.preventDefault();
        // add up the radio button responses in conjunction with scores obj/arr
        cbtApp.getFormResponses();
        console.log(cbtApp.userQuestionOneAnswer, cbtApp.userQuestionTwoAnswer, cbtApp.userQuestionThreeAnswer); 
        
        // send textarea response to API
        cbtApp.sentimApiCall(cbtApp.userTextAreaAnswer);
        // combine radio data with textarea sentiment response
        
        
        console.log(`cbtApp.answerKeyIcons is`, cbtApp.answerKeyIcons)
        console.log(`cbtApp.answerKeyIcons.question1 is`, cbtApp.answerKeyIcons.question1)
        console.log(`cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer] is`, cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer])
        console.log(`[cbtApp.userQuestionOneAnswer] is`, cbtApp.userQuestionOneAnswer)
        
        cbtApp.stuffThatHappensWhenApiComesBack();


        
    });
}

cbtApp.scrollToResultsOnFormSubmit = () => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        // animate the button TODO
        // $(this).transform

        // navigate down to results
        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $(".results").offset().top
            }, 400);
        }, 300);
    });
}

cbtApp.stuffThatHappensWhenApiComesBack = () => {
    $.when(cbtApp.sentimPromise)
    .then((res) => {
        // expand results section
        $('.results').show();

        // navigate down to results
        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $(".results").offset().top
            }, 400);
        }, 300);
        
        cbtApp.polarity = res.result.polarity;
        console.log(`cbtApp.polarity at the bottom`, cbtApp.polarity);
        cbtApp.addFormResponses();
        // display result(s) to (new) page
        cbtApp.displayResponseResultsToThePage();

        console.log(cbtApp.userQuestionOneAnswer, cbtApp.userQuestionTwoAnswer, cbtApp.userQuestionThreeAnswer);
    });
}

// dislpay our feedback relevant to answers using a conditional to display based on range
cbtApp.displayResponseResultsToThePage = () => {
    $('.answer').empty();
    if (cbtApp.addedFormResponses < -0.3) {
        let resultDisplay = `${cbtApp.resultsToDisplay.bad}`;
        $('.answer').append(resultDisplay);
    } else if (cbtApp.addedFormResponses >= -0.3 && cbtApp.addedFormResponses <= 0.3) {
        let resultDisplay = `${cbtApp.resultsToDisplay.ok}`;
        $('.answer').append(resultDisplay);
    } else {
        let resultDisplay = `${cbtApp.resultsToDisplay.good}`;
        $('.answer').append(resultDisplay);
    };    
    console.log(cbtApp.userQuestionOneAnswer, cbtApp.userQuestionTwoAnswer, cbtApp.userQuestionThreeAnswer); 
    console.log(resultDisplay);
} 


// *******************  AFTER FORM SUBMIT   ******************* END

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


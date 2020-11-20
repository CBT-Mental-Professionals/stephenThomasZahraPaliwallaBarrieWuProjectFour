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


cbtApp.addFormResponses = () => {
    cbtApp.addedFormResponses = (cbtApp.questionOneValue + cbtApp.questionTwoValue + cbtApp.questionThreeValue + cbtApp.polarity);
    console.log(cbtApp.addedFormResponses)
} 

cbtApp.numberToResult = () => {
    if (cbtApp.addedFormResponses < -0.3){
        let resultDisplay = `<p> You suck </p> `;
        $('.results').append(resultDisplay)
        console.log(resultDisplay);
        
    };
    
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
                cbtApp.polarity = res.result.polarity
                console.log(`cbtApp.polarity at the bottom`, cbtApp.polarity)
                cbtApp.addFormResponses();
                cbtApp.numberToResult();
            });
    });
}




// INIT
cbtApp.init = () => {
    cbtApp.getResults();
};

// DOC READY
$(function(){
    cbtApp.init();
});

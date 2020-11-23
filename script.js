// create name space for App
const cbtApp = {};

// storing API Url in variable 
cbtApp.apiUrl = "https://sentim-api.herokuapp.com/api/v1/";
// default skin setting
cbtApp.skin = 3;

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
        '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>',
        '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'
    ],
    "question2": [
        '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>',
        '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'
    ],
    "question3": [
        '<i class="fas fa-check-circle"></i>',
        '<i class="fas fa-times-circle"></i>'
    ]
}

cbtApp.htmlData = [
    // barrie mode
    {
        badImage: 'barrieBad.png',
        badImageAlt: 'badImageAlt',
        okImage: 'barrieOk.png',
        okImageAlt: 'okImageAlt',
        goodImage: 'barrieGood.png',
        goodImageAlt: 'goodImageAlt',
        badMessage: 'Barrie thinks you arent doing too well! Reach out to a friend!',
        okMessage: 'Barrie thinks you are doing alright! ',
        goodMessage: 'Barrie thinks you are well, keep up the good work!'
    },
    // zahra mode
    {
        badImage: 'zahra3.png',
        badImageAlt: 'zahra is looking concerned',
        okImage: 'zahra2.png',
        okImageAlt: 'Zahra is half smiling',
        goodImage: 'zahra.png',
        goodImageAlt: 'zahra is smiling with joy',
        badMessage: 'Bro to Bro, you need to change it up',
        okMessage: 'Bro, you could be doing better! ',
        goodMessage: 'Bro, you thriving'
    },
    // stephen mode
    {
        badImage: 'stephenBad.png',
        badImageAlt: 'badImageAlt',
        okImage: 'stephenOk.png',
        okImageAlt: 'okImageAlt',
        goodImage: 'stephenGood.png',
        goodImageAlt: 'goodImageAlt',
        badMessage: 'Mate. From one pirate to another... life is long. Your day will come.',
        okMessage: 'Mate, not bad. Keep up the good work. Toss the bad work',
        goodMessage: 'Christ mate what are you the pope arrr...'
    },
    // default settings
    {
        badImage: 'stephen.png',
        badImageAlt: 'badImageAlt',
        okImage: 'barrie.png',
        okImageAlt: 'okImageAlt',
        goodImage: 'zahra.png',
        goodImageAlt: 'goodImageAlt',
        badMessage: 'Stephen says: ahh fuck',
        okMessage: 'Barrie says: you are ok',
        goodMessage: 'Zahra says: good job'
    }
]

// *******************  BEFORE FORM SUBMIT   ******************* START


// obj w/ result properties to append to final results
// 1: BARRIE MODE /
// 2: ZAHRA MODE /
// 3: STEPHEN MODE /
// 4: DEFAULT MODE
cbtApp.textToDisplay = {
    'h1': [
        'Hello Friends!',
        'Hey bro!',
        `Mate, check yer head`,
        'feel fucking good'
    ],
    'h2': [
        'Please answer the questions below, Friends! ',
        'Answer the questions below, bro',
        'Arr..',
        'answer some questions. get some answers.'
    ],
    // question one 
    '.legendOne': [
        'How did you sleep last night?',
        'How you sleeping bro?',
        'Avast, ye. Do ye, like, sleep?',
        'do you fucking sleep?'
    ],
    '.questionOneAnswerOne': [
        'Sadly, not well',
        'Not well, bro',
        `Arr. Not in a dog's life`,
        'What the fuck is sleep?'
    ],
    '.questionOneAnswerTwo': [
        'An adaquate amount',
        'Pretty well, bro ',
        `Aye, a few winks, tho' not quite 40`,
        '3-6 hours'
        
    ],
    '.questionOneAnswerThree': [
        'Very well',
        'Like a baby, bro',
        `Mate I sleep like a dead fish every night o' the week`,
        '6-9 hours'

    ],
    // question two
    '.legendTwo': [
        'How many meals did have you had today?',
        'Did you eat, bro?',
        `Arr... ya eatin'?`,
        `How many fucking meals have you had today?`
    ],
    '.questionTwoAnswerOne': [
        'Didnt have the time',
        'Too busy bro',
        `Not a bite since last the sun was 'fore the mainsail (yesterday)`,
        'Who has time to eat?'

    ],
    '.questionTwoAnswerTwo': [
        'A few meals',
        '1-2 meals bro',
        `Been nibblin'`,
        '1-3 meals'

    ],
    '.questionTwoAnswerThree': [
        '3+ meals a day!',
        'gains, bro',
        'I feast proper',
        '3+ meals'

    ],
    // quesiton three
    '.legendThree': [
        'Have you had the chance to move your body?',
        'Did you lift today, bro?',
        `Arr.. have ye been shufflin' yer corpse about any, this day`,
        'Have you been active today?'
    ],
    '.questionThreeAnswerOne': [
        'Yes',
        'Duh, bro',
        'Today, I shuffled',
        'Yes'
    ],
    '.questionThreeAnswerTwo': [
        'Not today',
        'Rest day, bro',
        `I do not shuffle my corpse about, neither this way nor that, on this day`,
        'ALL I DO IS CODE'
    ],
    //textarea
    '.textAreaCopy': [
        'Tell me a little bit about your day so far:',
        'Bro, tell me about your day:',
        `Spin us a yarn encompassin' yer day`,
        'Tell us about one success and one challenge that you faced.'
    ],
    // ERROR MESSAGING BUBBLE TEXTBOX
    '.errorMessaging': [
        'Please type at least 30 characters',
        'Bro, dig deep. At least 30 characters',
        'Mate, look alive. Give us at least 30 characters',
        'Please type a minimum of 30 characters'
    ]
}


cbtApp.skinListener = () => {
    $('.skinSelect').on('click', function() {
        cbtApp.skin = $(this).val();
        for (i in cbtApp.textToDisplay) {
            $(i).text(cbtApp.textToDisplay[i][cbtApp.skin]);
        }
        console.log(cbtApp.skin);
        $('.skinSelect').removeClass('selectedMode');
        $(this).addClass('selectedMode');
    })
}


cbtApp.resultsToDisplay = {}


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
            $('.errorMessaging').text( `...keep typing... 20 characters to go`)
        } else if ($textAreaNumber === 20){
            $('.errorMessaging').toggleClass('rotate').text(`...keep typing... 10 characters to go`)
        } else if ($textAreaNumber === 25) {
            $('.errorMessaging').toggleClass('rotate').text(`...keep typing... 5 characters to go`)
        } else if ($textAreaNumber === 30) {
            $('.errorMessaging').toggleClass('rotate').text(`...you did it!`)
        }
    })
}

cbtApp.goDownToNextQuestion = () => {
    // listen to radio buttons being selected
    $('.questionOneAnswer').click(function () {
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
        console.log(`cbtApp.answerKeyIcons.question1 is`, cbtApp.answerKeyIcons.question1[0])
        console.log(`cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer] is`, cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer])
        console.log(`[cbtApp.userQuestionOneAnswer] is`, cbtApp.userQuestionOneAnswer)
        
        cbtApp.stuffThatHappensWhenApiComesBack();


        // Object within the 'sumbit' function
        cbtApp.resultsToDisplay = {
            bad: `<img src="assets/${cbtApp.htmlData[cbtApp.skin].badImage}" alt="Stephen with a stern look on his face">
            <p> Sleep: ${cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer]} <br> Meals: ${cbtApp.answerKeyIcons.question2[cbtApp.userQuestionTwoAnswer]} <br> Activity: ${cbtApp.answerKeyIcons.question3[cbtApp.userQuestionThreeAnswer]}</p>
            <p> ${cbtApp.htmlData[cbtApp.skin].badMessage} </p>`, 
            ok: `<img src="assets/${cbtApp.htmlData[cbtApp.skin].okImage}" alt="Barrie with a hesistant but friendly face">
            <p> Sleep: ${cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer]} <br> Meals: ${cbtApp.answerKeyIcons.question2[cbtApp.userQuestionTwoAnswer]} <br> Activity: ${cbtApp.answerKeyIcons.question3[cbtApp.userQuestionThreeAnswer]}</p>
            <p> ${cbtApp.htmlData[cbtApp.skin].okMessage} </p>`,
            good: `
            <img src="assets/${cbtApp.htmlData[cbtApp.skin].goodImage}" alt="Zahra with a friendly face">
            <p> Sleep: ${cbtApp.answerKeyIcons.question1[cbtApp.userQuestionOneAnswer]} <br> Meals: ${cbtApp.answerKeyIcons.question2[cbtApp.userQuestionTwoAnswer]} <br> Activity: ${cbtApp.answerKeyIcons.question3[cbtApp.userQuestionThreeAnswer]}</p>
            <p>  ${cbtApp.htmlData[cbtApp.skin].goodMessage} </p>`
        }
    });
}
// Stephen loves you!  Thumbs up from Barrie!  Zahra's got your back!
// ${cbtApp.htmlData[cbtApp.skin].badMessage}
// ${cbtApp.htmlData[cbtApp.skin].okMessage}
// ${cbtApp.htmlData[cbtApp.skin].goodMessage}

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
    
    //To refresh page
    $('.reloadButton').on('click', function () {
        window.location.reload(true);
    });
};

// DOC READY
$(function(){
    cbtApp.init();
});


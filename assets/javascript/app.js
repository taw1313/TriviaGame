// Global variables
var questionsAnswers = [];
questionsAnswers.push({question: "Which country has this flag?", 
                       possibleAnswers: ["Scottland", 
                                         "Norway", 
                                         "Denmark", 
                                         "Wales"],
                       answer: 3,
                       image: "assets/images/wales.png"});
questionsAnswers.push({question: "Which country has this flag?", 
                       possibleAnswers: ["Taiwan", 
                                         "South Korea", 
                                         "Philippines", 
                                         "Thailand"],
                       answer: 1,
                       image: "assets/images/korea.png"});
questionsAnswers.push({question: "Which country has this flag?", 
                       possibleAnswers: ["Tanzania", 
                                         "Sudan", 
                                         "Kenya", 
                                         "Zambia"],
                       answer: 2,
                       image: "assets/images/kenya.png"});
questionsAnswers.push({question: "Which country has this flag?", 
                       possibleAnswers: ["New Delhi", 
                                         "Nepal", 
                                         "Bhutan", 
                                         "Bangladesh"],
                       answer: 1,
                       image: "assets/images/nepal.png"});
questionsAnswers.push({question: "Which country has this flag?", 
                       possibleAnswers: ["Canada", 
                                         "Greenland", 
                                         "Norway", 
                                         "Cuba"],
                       answer: 0,
                       image: "assets/images/canada.png"});
 
var questionNumber = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var responseTimer = 10;
var responseTimerId;
var showAnswerTimer = 5;
var showAnswerTimerId;
var showEndTimer = 15;
var showEndTimerId;

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
function initGame() {
  questionNumber = 0;
  correct = 0;
  incorrect = 0;
  unanswered = 0;
}

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
function resetTimers() {
  responseTimer = 10;
  showAnswerTimer = 5;
  showEndTimer = 15;
}

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
$(document).ready(function() {
  //------------------------------------------------------------------------------------
  // find all DOM references 
  //------------------------------------------------------------------------------------
  var jq_main = $("body");
  var jq_scoreArea = jq_main.find("#score-area");
  var jq_QandAarea = jq_main.find("#question-answer-area");
  var jq_countDownArea = jq_main.find("#count-down");
  var jq_newTimeLeft = $("<h2>");
  jq_newTimeLeft.text( "00:00" );
  jq_countDownArea.append( jq_newTimeLeft );

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function buildStartGame() {
    jq_scoreArea.empty();
    jq_scoreArea.append('<button id="start-game"> Start </button>');
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function buildScoreArea() {
    jq_scoreArea.append('<h3> Score </h3>');
    jq_scoreArea.append('<p> Correct: <span id="correct-text"></span></p>');
    jq_scoreArea.append('<p> Incorrect: <span id="incorrect-text"></span></p>');
    jq_scoreArea.append('<p> Unanswered: <span id="unanswered-text"></span></p>');
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function updateStats() {
    var jq_correct = jq_scoreArea.find("span#correct-text");
    var jq_incorrect = jq_scoreArea.find("span#incorrect-text");
    var jq_unanswered = jq_scoreArea.find("span#unanswered-text");
    jq_correct.text(correct);
    jq_incorrect.text(incorrect);
    jq_unanswered.text(unanswered);
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function buildQuestionAnswers(index) {
    
    var jq_newQuestionDiv = $("<div>");
    jq_newQuestionDiv.addClass("row");

    var jq_newQuestionDiv2 = $("<div>");
    jq_newQuestionDiv2.addClass("col-sm-2");

    var jq_newQuestionImg = $("<img>");
    jq_newQuestionImg.addClass("img-responsive");
    jq_newQuestionImg.attr("src",questionsAnswers[questionNumber].image);
    jq_newQuestionImg.attr("alt", "response image");
    jq_newQuestionDiv2.append( jq_newQuestionImg );

    var jq_newQuestionDiv3 = $("<div>");
    jq_newQuestionDiv3.addClass("col-sm-offset-1 col-sm-9");
    var jq_newQuestionTxt = $("<h2>");
    jq_newQuestionTxt.text(questionsAnswers[index].question);
    jq_newQuestionDiv3.append( jq_newQuestionTxt );

    for (var i=0; i<questionsAnswers[index].possibleAnswers.length; i++) {
      var jq_newPossibleTxt = $("<p>");
      jq_newPossibleTxt.addClass("button-answer");
      jq_newPossibleTxt.attr("id", i);
      jq_newPossibleTxt.attr("style", "cursor:pointer;");
      jq_newPossibleTxt.text(questionsAnswers[index].possibleAnswers[i]);
      jq_newQuestionDiv3.append( jq_newPossibleTxt );
    }

    jq_newQuestionDiv.append( jq_newQuestionDiv2 );
    jq_newQuestionDiv.append( jq_newQuestionDiv3 );

    return jq_newQuestionDiv;
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function timeToTimeStr( sec ) {
    var minutes = Math.floor( sec / 60 );
    var seconds = sec - (minutes * 60);

    if ( seconds < 10 ) {
      var seconds = "0" + seconds;
    }

    if ( minutes === 0 ) {
      minutes = "00";
    }
    else if ( minutes < 10 ) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function updateTimer(txtMsg, timeCount) {
    jq_newTimeLeft.text( txtMsg + " " + timeToTimeStr( timeCount ) );
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function runTimer() {
    responseTimerId = setInterval(decrement, 1000);
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function decrement() {
    responseTimer--;
    updateTimer( "Response", responseTimer );
    // timer expired
    if ( responseTimer <= 0 ) {
      clearInterval(responseTimerId);   // Stop timer
      buildResponseArea( -1 );
    if ( questionNumber >= questionsAnswers.length-1 ) {
      resetGame();
    }
    }
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function waitThenResetAnswer() {
    showAnswerTimerId = setInterval(reduceAnswerTimer, 1000);
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function reduceAnswerTimer() {
    showAnswerTimer--;
    updateTimer( "Answer", showAnswerTimer );
    // timer expired
    if ( showAnswerTimer <= 0 ) {
      clearInterval(showAnswerTimerId);   // Stop timer
      jq_QandAarea.empty();
      ++questionNumber;
      if ( questionNumber < questionsAnswers.length ) {
        jq_QandAarea.append( buildQuestionAnswers( questionNumber ) );
        resetTimers();
        runTimer();
      }
    }
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function waitThenResetEnd() {
    showEndTimerId = setInterval(reduceEndTimer, 1000);
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function reduceEndTimer() {
    showEndTimer--;
    updateTimer( "End", showEndTimer );
    // timer expired
    if ( showEndTimer <= 0 ) {
      clearInterval(showEndTimerId);   // Stop timer
      jq_QandAarea.empty();
      buildStartGame();
    }
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function resetGame() {

    console.log("resetGame()" + jq_QandAarea);

    jq_QandAarea.empty();
    clearInterval(responseTimerId);
    clearInterval(showAnswerTimerId);

    var jq_newResponseDiv1 = $("<div>");
    jq_newResponseDiv1.addClass("row col-sm-12");

    var jq_newResponseTxt = $("<h1>");
    jq_newResponseTxt.text("Game Over");
    jq_newResponseDiv1.append( jq_newResponseTxt );

    jq_QandAarea.append( jq_newResponseDiv1 );
    
    resetTimers();
    initGame();
    waitThenResetEnd();
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function buildResponseArea( id ) {
    var response ="";
    var correctID = questionsAnswers[questionNumber].answer;
    var correctAnswer = questionsAnswers[questionNumber].possibleAnswers[correctID];

    jq_QandAarea.empty();
    clearInterval(responseTimerId);   // stop timer Question and aswer timer

    if (id == -1 ) {
      ++unanswered;
      response = "Time Out!";
    }
    else if ( id == questionsAnswers[questionNumber].answer ) {
      ++correct;
      response = "Correct!";
    }
    else {
      ++incorrect
      response = "Wrong!";
    }

    updateStats();

    var jq_newResponseDiv1 = $("<div>");
    jq_newResponseDiv1.addClass("row col-sm-12");

    var jq_newResponseTxt = $("<h2>");
    jq_newResponseTxt.text(response);
    jq_newResponseDiv1.append( jq_newResponseTxt );

    var jq_newResponseDiv2 = $("<div>");
    jq_newResponseDiv2.addClass("row");

    var jq_newResponseDiv3 = $("<div>");
    jq_newResponseDiv3.addClass("col-sm-2");

    var jq_newResponseImg = $("<img>");
    jq_newResponseImg.addClass("img-responsive");
    jq_newResponseImg.attr("src",questionsAnswers[questionNumber].image);
    jq_newResponseImg.attr("alt", "response image");
    jq_newResponseDiv3.append( jq_newResponseImg );
    jq_newResponseDiv2.append( jq_newResponseDiv3 );

    var jq_newResponseDiv4 = $("<div>");
    jq_newResponseDiv4.addClass("col-sm-offset-1 col-sm-9");
    var jq_newAnswerTxt = $("<h3>");
    jq_newAnswerTxt.text( "Correct answer is: " + correctAnswer );
    jq_newResponseDiv4.append( jq_newAnswerTxt );
    jq_newResponseDiv2.append( jq_newResponseDiv4 );


    jq_QandAarea.append( jq_newResponseDiv1 );
    jq_QandAarea.append( jq_newResponseDiv2 );
    
    waitThenResetAnswer();
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function determineAnswer() {
    var selectedAnswer = $(this);
    var id = selectedAnswer.attr('id');

    buildResponseArea( id );
    console.log("determineAnswer() "+ questionsAnswers.length);
    if ( questionNumber >= questionsAnswers.length-1 ) {
      resetGame();
    }

  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  function startGame() {

    jq_scoreArea.empty();
    buildScoreArea();
    initGame();
    updateStats();

    jq_QandAarea.append( buildQuestionAnswers( questionNumber ) );
    runTimer();
  }

  buildStartGame();

  //----------------------------------------------------------------------------------
  //  I am building the following child elements that will used to identify the answer
  //  the user selects
  //
  //    var jq_newPossibleTxt = $("<p>");
  //    jq_newPossibleTxt.addClass("button-answer");
  //    jq_newPossibleTxt.attr("id", i);
  //
  // And sense the "child" buttun-answer does not exist we have to use a technique called
  // Event Delegation.... so the event is created using it's parent in this case id 
  // question-answer-area which is the ancor and "p.button-answer" is the selector that
  // on() will use 
  //----------------------------------------------------------------------------------
  $("#score-area").on('click', "button#start-game", startGame);
  $("#question-answer-area").on('click', "p.button-answer", determineAnswer);


});
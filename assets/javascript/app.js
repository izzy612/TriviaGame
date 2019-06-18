var questions = [
  {
    question: 'How many kids do the Belchers have?',
    choices: ['1', '2', '3'],
    answer: '3',
    userAnswer: '',
  },
  {
    question: "What' Louise's typical headwear?",
    choices: ['Top Hat', 'Bunny Hears', 'Headbang'],
    answer: 'Bunny Hears',
    userAnswer: '',
  },
  {
    question: 'Which Belcher children is a huge music fan?',
    choices: ['Louise', 'Tina', 'Gene'],
    answer: 'Gene',
    userAnswer: '',
  },
  {
    question: 'What business is always next door to the restaurant?',
    choices: ['Funeral Home', 'Bank', 'Yoga Studio'],
    answer: 'Funeral Home',
    userAnswer: '',
  },
  {
    question: 'How much does the burger of the day cost?',
    choices: ['$0.99', '$5.95', '$6.69'],
    answer: '$5.95',
    userAnswer: '',
  },
  {
    question: 'What street is Bob’s Burgers on?',
    choices: ['Ocean Ave', 'Burger Ave', 'Pesto Ave'],
    answer: 'Ocean Ave',
    userAnswer: '',
  },
  {
    question: 'Name of amusement park?',
    choices: ['Amusement Park', 'Splashy Zone', ' Wonder Wharf'],
    answer: 'Wonder Wharf',
    userAnswer: '',
  },
  {
    question: 'Tina’s imaginary horse?',
    choices: ['Federico', 'Jericho', 'Mort'],
    answer: 'Jericho',
    userAnswer: '',
  },
  {
    question: "Who is Bob's landlord?",
    choices: ['Mr. Fischoeder', 'Mr. Dowling', 'Mr. Smith'],
    answer: 'Mr. Fischoeder',
    userAnswer: '',
  },
  {
    question: ' Who is Bobs next door neighbor?',
    choices: ['Zeke', 'Teddy', 'Mort'],
    answer: 'Mort',
    userAnswer: '',
  },
  {
    question: 'What does Tina wake up an hour early to do?',
    choices: ['Think about horse', 'Write erotic fan fiction', 'Draw butts'],
    answer: 'Write erotic fan fiction',
    userAnswer: '',
  },
  {
    question: 'What is Louise`s night light light called ?',
    choices: ['Kuchi Kopi', 'Korra Kuchi', 'Kopi Kuppa'],
    answer: 'Kuchi Kopi',
    userAnswer: '',
  },
  {
    question: 'Which Boyz 4 Now member does Louise fancy and wants to slap?',
    choices: ['Griffin', 'Boo Boo', 'Alen'],
    answer: 'Boo Boo',
    userAnswer: '',
  },
];

//stop the timer
//make the done button work
//shows their stats

var clockRunning = false;
var timeLeft = 60;
var clock;
var correctAnswers = [];


window.onload = function() {
  $('#done').on('click', function() {
    console.log('clicked');
    done();
  });
  $('#start').on('click', start);
  
  
};

function start() {
  $('#start').addClass('hide');
  $('#questions').removeClass('hide');
  $('.image').removeClass('hide');

  if ((clockRunning = false)) {
    clockRunning = true;
  }

  clock = setInterval(runClock, 1000);
  $('#end-page').addClass('hide');
}

function runClock() {
  timeLeft--;
  $('.counter').html(timeLeft);

  if (timeLeft === 0) {
    done();
    clearInterval(timeLeft);
    // clockRunning = false
  }
}

function done() {
  console.log(clock);
  clearInterval(clock);
  clockRunning = false;

  

  $('#correct').removeClass('hide');
  $('.image').addClass('hide');
  $('#questions').addClass('hide');
  $('.counter').addClass('hide')
  $('#count').addClass('hide');
  $('#end-page').removeClass('hide');
  $("#start").addClass('hide');

  for (var i = 0; i < questions.length; i++) {
    console.log(questions[i]);
    if (questions[i].answer === questions[i].userAnswer) {
      correct++;
      console.log(correct);
      
      $('#correct-answers').text('Correct Answers: ' + correct);
    } else {
      incorrect++;
      console.log(incorrect);
        
      $('#incorrect-answers').text('Incorrect Answers: ' + incorrect);
      
      console.log(incorrect);
    }

    
  }

  
  
 
}
var incorrect = 0;
var correct = 0;


function audio() {
  var sound = new Audio('../images/come_meet_our_family (1).mp3')
  sound.play();
}


// function to print all questions to page
function renderQuestions() {
  // clear out form
  $('#quiz-form').empty();

  // Loop through questions array
  questions.forEach(function(question, index) {
    // create div to hold question
    var $question = $('<div>').addClass('card');
    $('div').addClass('custom-card');

    // <div class="form-group"></div>

    // add question to div
    var $label = $('<h5>').text(question.question).appendTo($question);
    /*
          <div class="form-group"> 
            <h4>Question 1</h4> 
          </div>
        */

    // shuffle choices
    question.choices = question.choices.sort(function() {
      return 0.5 - Math.random();
    });

    // create a loop to iterate through question's choices and create radio buttons for each one
    for (var i = 0; i < question.choices.length; i++) {
      // create a div for choice and add bootstrap classes
      var $choice = $('<div>');
      $choice.addClass('form-check form-check-inline');

      // create an input tag for the radio button
      var $radio = $('<input>');

      // add attributes to provide the answer choice
      // the "name" attribute is super important, all radio buttons per question need to have the same "name" so they know which question it applies to
      $radio
        .attr({
          type: 'radio',
          value: question.choices[i],
          name: index,
          class: 'form-check-input',
        })
        .appendTo($choice);

      // create label to actually print the choice to the page
      var $choiceLabel = $('<label>');
      $choiceLabel
        .text(question.choices[i])
        .addClass('form-check-label')
        .appendTo($choice);

      // add whole radio button choice to question
      $choice.appendTo($question);
    }
    // when done making all of the choices, add whole question to the page
    $('#quiz-form').append($question);
  });
}

// create on "change" listener for all radio buttons but bind them to quiz-form since it's permanently on the page
$('#quiz-form').on('change', '.form-check-input', function() {
  console.log(this);

  // GET question index out of "name" attribute so we know what question you answered
  var questionIndex = $(this).attr('name');

  console.log(questions[questionIndex]);

  // get value out of radio button you selected
  var answer = $(this).val();

  // set answer to question's userAnswer property
  questions[questionIndex].userAnswer = answer;
});

renderQuestions();

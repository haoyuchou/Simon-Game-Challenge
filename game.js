var gamePattern = [];
var userClickPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

//compare two array
function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {

      if (element === array2[index]) {
        return true;
      }

      return false;
    });
  }

  return false;
}

//use while loop to check if two array are same
function checkAnswer(){
  //userClickPattern is the same as gamePattern
  if(areEqual(gamePattern, userClickPattern)){
    console.log("success");
    //next level
    setTimeout(nextSequence(), 2 * 1000);
    userClickPattern = [];
  }
  else{
    console.log("wrong");
    //wrong answer music
    var wrongAnswer = new Audio("sounds/wrong.mp3");
    wrongAnswer.play();

    //game over animation
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)

    //change h1
    $("h1").html("Game Over, Press Any Key to Restart");

    //start Over
    startAgain();

  }
}

function animatePress(currentColor){
  var nowColor = $("#" + currentColor);

    nowColor.addClass("pressed");
    //and remove class after 100 mils
    setTimeout(function(){
      nowColor.removeClass("pressed");
    }),
    100
}

//Audio for the random color
function playSound(colorPlay) {
  var randomAudio = new Audio("sounds/" + colorPlay + ".mp3");
  randomAudio.play();
}


function nextSequence() {
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  //increase a Level
  level = level + 1;

  //update h1
  $("h1").html("Level " + level);

  //Randomly choose a color
  var randomChosenColor = buttonColors[randomNumber];

  //add that color
  gamePattern.push(randomChosenColor);

  //animation for the random color
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  //play Audio
  playSound(randomChosenColor);

  return randomChosenColor;
}

function startAgain(){
  level = 0;
  gamePattern = [];
  userClickPattern = [];
  start = 0;
}


//game execution

var start = 0;
$("body").keydown(function() {
  if (start === 0){
      $("h1").html("Level " + 0);
    //startGame();
    nextSequence();
    start = 1;
    //start as level 0
  }
})


//detect button got pressed
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);

  //if last click according to level
  if(userClickPattern.length >= level){
    checkAnswer();
  }
})

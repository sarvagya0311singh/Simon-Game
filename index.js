var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



// Used jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //  created a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");


  userClickedPattern.push(userChosenColour);

  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);


  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    // Checking if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success"); //this is just for checking not important in the code

      // If the user got the most recent answer right, then checked that wheather they have finished their sequence.
      if (userClickedPattern.length === gamePattern.length){

        // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      // play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //  applying game-over class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      // Changing the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      // Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}




function nextSequence(){


  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // increasing the level by 1 every time nextSequence() is called.
  level++;

  // updateing the h1 with the change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  //  use jQuery to animate a flash to the button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(randomChosenColour);

  }

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");
  setTimeout(function(){
    activeButton.removeClass("pressed");
  }, 100);
}


function startOver() {

  
  level = 0;
  gamePattern = [];
  started = false;
}

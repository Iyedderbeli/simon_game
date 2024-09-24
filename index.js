var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var wrong=new Audio("./sounds/wrong.mp3");
var level=0;
var started = false;
$(document).keypress(function () { 
    if (!started) {

    
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
}
});

$(".btn").click(function(){
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



function startOver() {
   gamePattern=[];
   level=0;
   started = false;
  }
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed")
    var delayInMilliseconds = 100; 

setTimeout(function() {
    $("#"+currentColour).removeClass("pressed")
}, delayInMilliseconds);
}
function playSound(name) {
    var audio = new Audio("sounds/" +  name + ".mp3");
    audio.play();
}
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
  }
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
     setTimeout(function () {
    $("body").removeClass("game-over");
    
        }, 200);
        startOver();
    }

}

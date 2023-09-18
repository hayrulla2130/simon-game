var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var place = 0;
var start = true;

$('.btn').click(function () {
    var id = $(this).attr('id');
    playSound(id);
    checkAnswer(id);
    animatePress(id);
});

$(document).keypress(function (event) {
    console.log(event.key);
    if (start){
        nextSequence();
        $('#level-title').text('Level ' + level);
        start = !start;
    }
});

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    $('.' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    level++;
    $('#level-title').text('Level ' + level);
}

function playSound(name) {
    var sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
}

function animatePress(buttonid) {
    $('#' + buttonid).addClass('pressed');
    setTimeout(() => {
        $('#' + buttonid).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (currentLevel === gamePattern[place]) {
        place++;
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Replace');
        startOver();
    }
    if (place === level && !start) {
        place = 0;
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    place = 0;
    start = true;
}


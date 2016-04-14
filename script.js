// To do:
	// can cheat because check() is listening while play() is playing (turn event listners off?)
	// interrupt audio with a new button click
	// add click sound for strict button

var sequence = [];
var playerSequence = [];
var strict = false;
var turnedOn = false;
var count = 0;
var blueSound = new Audio('audio/1.mp3');
var greenSound = new Audio('audio/2.mp3');
var redSound = new Audio('audio/3.mp3');
var yellowSound = new Audio('audio/4.mp3');
var startSound = new Audio('audio/start.mp3');
var winSound = new Audio('audio/win.mp3');
var loseSound = new Audio('audio/lose.mp3');

function randColor() {
	var colors = ['red', 'blue', 'green', 'yellow'];
	var num = Math.floor(Math.random() * 4);
	return colors[num];
}

function play() {

	var interval = 1400;
	var wait = [];
	
	for (i = 0; i < sequence.length; i++) {
		var w = i * interval;
		wait.push(w);

		setTimeout(function(i, sequence){
			var sound;
			switch (sequence[i]) {
				case 'red':
					sound = redSound;
					break;
				case 'blue':
					sound = blueSound;
					break;
				case 'yellow':
					sound = yellowSound;
					break;
				case 'green':
					sound = greenSound;
					break;
			}
			sound.play();
			light(sequence[i])
		}, wait[i], i, sequence);
	}
	return;
}

function sequencer() {
	if (sequence.length === 20) {
		winner();
	}
	sequence.push(randColor());
	play();
	playerSequence = [];
	return;
}

function check(color) {
	if (!turnedOn) {
		return;
	}

	playerSequence.push(color);
	var correct = true;

	for (i = 0; i < playerSequence.length; i++) {
		if (!sequence[i] || playerSequence[i] !== sequence[i]) {
			correct = false;
		}
	}
	
	if (!correct) {
		loser();
		return;
	} else if (playerSequence.length === sequence.length) {
		count += 1;
		$('#count').text(count);
		setTimeout(function(){
			sequencer();
		}, 2000);
		return;
	}
}

function winner() {
	winSound.play();
	$('#title').text('win!!');
	lightAll();
	setTimout(function(){
		lightAll();
	}, 1500);
	

}

function loser() {
	loseSound.play();
	$('#title').text('oops!');
	if (strict) {
		setTimeout(function(){
			start();
		}, 1000);
		
	} else {
		playerSequence = [];
		lightAll();
		setTimeout(function(){
			$('#title').text('what?');
			play();
		}, 2000);
	}
	return;
}

function lightAll(){
	light('red');
	light('blue');
	light('yellow');
	light('green');
}

function start() {
	sequence = [];
	playerSequence = [];
	count = 0;
	lightAll();
	turnedOn = true;
															// sound (scale up, chord)
	$('#title').text('what?');
	$('#count').text(count);
	setTimeout(function(){sequencer();}, 2000);
}

function light(color) {

	var id = "#" + color;
	var activeClass = 'active-' + color;
	var hoverClass = 'hover-' + color;
	var normalClass = 'normal-' + color;
	var removeStr = hoverClass + " " + normalClass;

	$(id).removeClass(removeStr).addClass(activeClass);
	var litUp = window.setTimeout(function(){
		$(id).removeClass(activeClass).addClass(normalClass);
	}, 1000);
	return;
}

function clickers() {
	$('#red').hover(function(){
		$(this).removeClass('normal-red').addClass('hover-red');
	}, function(){
		$(this).removeClass('hover-red active-red').addClass('normal-red');
	})

	$('#red').mousedown(function(){
		$(this).removeClass('hover-red').addClass('active-red');
		redSound.play();
		check('red')
	}).mouseup(function(){
		$(this).removeClass('active-red').addClass('hover-red');
	})

	$('#yellow').hover(function(){
		$(this).removeClass('normal-yellow').addClass('hover-yellow');
	}, function(){
		$(this).removeClass('hover-yellow active-yellow').addClass('normal-yellow');
	})

	$('#yellow').mousedown(function(){
		$(this).removeClass('hover-yellow').addClass('active-yellow');
		yellowSound.play();
		check('yellow')
	}).mouseup(function(){
		$(this).removeClass('active-yellow').addClass('hover-yellow');
	})

	$('#blue').hover(function(){
		$(this).removeClass('normal-blue').addClass('hover-blue');
	}, function(){
		$(this).removeClass('hover-blue active-blue').addClass('normal-blue');
	})

	$('#blue').mousedown(function(){
		blueSound.play();
		check('blue')
		$(this).removeClass('hover-blue').addClass('active-blue');
	}).mouseup(function(){
		$(this).removeClass('active-blue').addClass('hover-blue');
	})

	$('#green').hover(function(){
		$(this).removeClass('normal-green').addClass('hover-green');
	}, function(){
		$(this).removeClass('hover-green active-green').addClass('normal-green');
	})

	$('#green').mousedown(function(){
		greenSound.play();
		check('green')
		$(this).removeClass('hover-green').addClass('active-green');
	}).mouseup(function(){
		$(this).removeClass('active-green').addClass('hover-green');
	})

	$('#strict').click(function(){
															// sound (click)
		strict = !strict;
		if (strict) {
			$(this).removeClass('strict-off').addClass('strict-on');
		} else {
			$(this).removeClass('strict-on').addClass('strict-off');
		}	
	})

	$('#start').click(function(){
		startSound.play()
		start();
	})
}

$(document).ready(function(){
	blueSound.load();
	greenSound.load();
	redSound.load();
	yellowSound.load();
	startSound.load();
	winSound.load();
	loseSound.load();

	clickers();
});
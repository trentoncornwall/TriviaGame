var questionOne = {
	question:
		"What classic horror movie features a serial killer in a William Shatner mask?",
	choices: [
		"friday the 13th",
		"halloween",
		"texas chainsaw massacre",
		"the fog"
	],
	answer: "halloween"
};

var questionTwo = {
	question:
		"In what horror movie does the protagonist write a book that contains only the line 'All work and no play makes Jack a dull boy' repeated over and over and over?",
	choices: ["the shining", "the devil's rain", "writer's block", "room 1408"],
	answer: "the shining"
};

var questionThree = {
	question: "What was the original title of The Blob?",
	choices: ["the lump", "the glob", "the goop", "the creature"],
	answer: "the glob"
};

var questionFour = {
	question:
		"What horror film caused some theatres to suggest that patrons prone to motion sickness sit in the aisle seats?",
	choices: [
		"vertigo",
		"mimic",
		"friday the 13th, part iii: 3d",
		"the blair witch project"
	],
	answer: "the blair witch project"
};

var questionFive = {
	question: "What was leatherface's choice weapon?",
	choices: ["knife", "axe", "chainsaw", "bat"],
	answer: "chainsaw"
};

var questionSix = {
	question:
		"What was the name that the demon from 'The Exorcist' used to contact Regan?",
	choices: [
		"captain spaulding",
		"captain jack",
		"captain howdy",
		"captain harry"
	],
	answer: "captain howdy"
};

var questionSeven = {
	question: "What is the name of the camp in Friday the 13th?",
	choices: [
		"camp mooselake",
		"camp crystal lake",
		"camp waziyata",
		"camp timber lake"
	],
	answer: "camp crystal lake"
};

var questionEight = {
	question: "What was the name of the killer clown in Stephen King's 'IT'?",
	choices: ["pennywise", "pumpernickel", "monster", "clowny"],
	answer: "pennywise"
};

var questionNine = {
	question:
		"How many people associated with 'The Exorcist' died during the film's year-long shoot?",
	choices: ["none", "9 people", "5 people", "2 people"],
	answer: "9 people"
};

var questionTen = {
	question:
		"Which one of these famous slashers has accumulated the highest body count?",
	choices: ["freddy krueger", "michael myers", "jason voorhees", "leatherface"],
	answer: "jason voorhees"
};
function timerStart(secs) {
	var intervalID;
	clearInterval(intervalID);
	intervalId = setInterval(decrement, 1000);

	function decrement() {
		secs--;
		$(".timer").html("<h2>" + secs + "<h2>");

		//*IF THE PLAYER RUNS OUT OF TIME
		if (secs <= 0) {
			clearInterval(intervalId);
			board.outOfTime();
			// TODO user gets one incorrect and creates a new question
		}
	}
}

function timerStop() {
	clearInterval(intervalId);
}

var board = {
	correct: 0,
	incorrect: 0,

	currentQuestion: null,
	currentChoices: null,
	answer: null,

	winningImage: "CORRECT ANSWER",
	losingImage: "WRONG ANSWER",
	outOfTimeImage: "OUT OF TIME",

	questions: [
		questionOne,
		questionTwo,
		questionThree,
		questionFour,
		questionFive,
		questionSix,
		questionSeven,
		questionEight,
		questionNine,
		questionTen
	],
	onQuestion: 0,

	drawBoard: function() {
		// TODO clear off preivous question
		$(".question").empty();
		$(".choices").empty();

		if (this.onQuestion < this.questions.length) {
			//* sets current question and choices to be on the screen to display
			this.currentQuestion = this.questions[this.onQuestion].question;
			this.currentChoices = this.questions[this.onQuestion].choices;
			this.answer = this.questions[this.onQuestion].answer;

			//* DISPLAYS QUESTIONS
			$(".question").html("<span>" + this.currentQuestion + "</span>");

			//*DISPLAYS CHOICES
			for (i = 0; i < this.currentChoices.length; i++) {
				newDiv = $("<div class='option' id='" + i + "'>");
				newDiv.text(this.currentChoices[i]);
				$(".choices").append(newDiv);
			}

			//*MOVE TO NEXT QUESTION
			this.onQuestion++;
			// timerStart(10);
			waitClick();
		} else {
			// TODO include a reset button
			// TODO reset scores
			$(".timer").empty();
			clearInterval(intervalId);
			newDiv = $("<div class='scoreboard'>");
			correctDiv = $("<div id='correctscore'>");
			incorrectDiv = $("<div id='incorrectscore'>");
			correctDiv.html("<span>'Correct Answers: " + this.correct + "</span>");
			incorrectDiv.html(
				"<span>'Incorrect Answers: " + this.incorrect + "</span>"
			);
			newDiv.append(correctDiv, incorrectDiv);
			$(".choices").append(newDiv);
		}
	},

	outOfTime: function() {
		//!CLEARS BOARD DISPLAY IMAGE FOR 5 SECS RESETS BOARD
		this.incorrect++;
		$(".question").empty();

		//*displays timeout image
		$(".choices").html(this.outOfTimeImage);

		//*redraws board after 5 secs
		setTimeout(function() {
			board.drawBoard();
		}, 5000);
	},

	correctChoice: function() {
		this.correct++;
		//*clears board
		timerStop();
		$(".question").empty();
		$(".choices").html(this.winningImage);
		//*redraws board after 5 secs
		setTimeout(function() {
			board.drawBoard();
		}, 5000);
	},

	wrongChoice: function() {
		this.incorrect++;
		//*clears board
		timerStop();
		$(".question").empty();
		$(".choices").html(this.losingImage);
		//*redraws board after 5 secs
		setTimeout(function() {
			board.drawBoard();
		}, 5000);
	},

	//* checks the users guess
	check: function(choice) {
		//* if guess is correct
		if (choice === this.answer) {
			this.correctChoice();
		} else {
			this.wrongChoice();
		}
	}
};

//* functions for clicking the options
function waitClick() {
	$("#0").on("click", function() {
		guess = $(this).text();
		board.check(guess);
	});
	$("#1").on("click", function() {
		guess = $(this).text();
		board.check(guess);
	});
	$("#2").on("click", function() {
		guess = $(this).text();
		board.check(guess);
	});
	$("#3").on("click", function() {
		guess = $(this).text();
		board.check(guess);
	});
}

board.drawBoard();

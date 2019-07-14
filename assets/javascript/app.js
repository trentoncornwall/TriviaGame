var questionOne = {
	question: "This is first question, answer is 4",
	choices: ["first choice", "second choice", "third choice", "forth choice"],
	answer: "forth choice"
};

var questionTwo = {
	question: "This is the first question, answer 2",
	choices: ["FIRST CHOICE", "SECOND CHOICE", "THIRD CHOICE", "FORTH CHOICE"],
	answer: "SECOND CHOICE"
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

	questions: [questionOne, questionTwo],
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
			timerStart(10);
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

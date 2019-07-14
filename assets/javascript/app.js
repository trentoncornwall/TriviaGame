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

var board = {
	correct: 0,
	incorrect: 0,

	currentQuestion: null,
	currentChoices: null,
	answer: null,
	winningImage: null,
	losingImage: null,

	questions: [questionOne, questionTwo],
	onQuestion: 0,

	timerStart: function(secs) {
		var intervalID;
		clearInterval(intervalID);
		intervalId = setInterval(decrement, 1000);

		function decrement() {
			secs--;
			$(".timer").html("<h2>" + secs + "<h2>");

			if (secs <= 0) {
				clearInterval(intervalId);
				this.incorrect++;
				// TODO user gets one incorrect and creates a new question
				console.log("OUT OF TIME");
			}
		}
	},

	timerStop: function() {
		clearInterval(intervalId);
	},

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
			this.timerStart(30);
			waitClick();
		} else {
			// TODO Show scoreboard
			// TODO reset timer
			// TODO include a reset button
			alert("SHOW SCOREBOARD AND RESET BUTTON");
		}
	},

	correctChoice: function() {
		this.correct++;
		this.timerStop();
		this.drawBoard();
	},

	wrongChoice: function() {
		this.incorrect++;
		this.timerStop();
		this.drawBoard();
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

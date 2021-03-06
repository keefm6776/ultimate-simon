function resetGame() {
	playArray = [];
	// Empty array of button presses
	window.location.reload();
	// Reload Window To Reset Game
}

function playButton(buttonNo, delay) {
	// takes button number from original array or from user 
	// click to illuminate the corresponding button and play the tone.
	"use strict";
	const synth = new Tone.Synth();
	// start new Tone instance
	synth.toMaster();
	// ouput tone to speakers
	if (buttonNo == 0) {
		// if red button
		synth.triggerAttackRelease("A4", 1.8);
		// play red tone
		highlightButton("#red-button", delay)
		// highlight red button
	} else if (buttonNo == 1) {
		// if green button
		synth.triggerAttackRelease("E5", 1.8);
		// play green tone
		highlightButton("#green-button", delay)
		// highlight green button
	} else if (buttonNo == 2) {
		// if yellow button
		synth.triggerAttackRelease("C4", 1.8);
		// play yellow tone
		highlightButton("#yellow-button", delay)
		// highlight yellow button
	} else if (buttonNo == 3) {
		//if blue button
		synth.triggerAttackRelease("E4", 1.8);
		// play blue tone
		highlightButton("#blue-button", delay)
		// highlight blue button
	} else if (buttonNo == 4) {
		// if purple button
		synth.triggerAttackRelease("C5", 1.8);
		// play purple tone
		highlightButton("#purple-button-landscape", delay)
		//highlight landscape purple button
		highlightButton("#purple-button-portrait", delay)
		//highlight portrait purple button

	} else if (buttonNo == 5) {
		// if brown button
		synth.triggerAttackRelease("A5", 1.8);
		// play brown tone
		highlightButton("#brown-button-landscape", delay)
		// highlight landscape brown button
		highlightButton("#brown-button-portrait", delay)
		// highlight portrait brown button
	}
}

function checkUserInput(arrayToCheck, userArray, userResponse) {
	"use strict";
	if (gameParameters.playForward == true) {
		// if forward play selected
		var SequenceCheck = gameParameters.currentSequenceIndex;
		// Forward sequence check used
	} else {
		var SequenceCheck = gameParameters.currentSequenceIndexRev;
		// if reverse play, reverse play used
	}

	if (arrayToCheck[SequenceCheck] !== userResponse) {
		// if user response is incorrect
		showUserPrompt("Sorry - You Lost!");
		// display losing message
		loserLoser(resetGame, gameParameters.noOfButtons);
		//play losing button sequence/tones
	}

	if (userArray.length === gameParameters.noOfRounds) {
		// if user answers all correct
		showUserPrompt("Congratulations - You WON!!");
		//  display winning message
		winnerWinnerChickenDinner(resetGame, gameParameters.noOfButtons);
		// play winning button sequence/tones
	}

	if (userArray.length === gameParameters.currentRound) {
		// if all correct in current round
		gameParameters.currentSequenceIndex = 0;
		// reset index to 0 for forward play
		gameParameters.currentSequenceIndexRev = gameParameters.currentRound;
		// reset index to current round for reverse play
	} else {
		gameParameters.currentSequenceIndex += 1;
		//  if sequence still being followed move to next respose check fwd
		gameParameters.currentSequenceIndexRev = gameParameters.currentSequenceIndexRev - 1;
		//  if sequence still being followed move to next respose check rev
	}

}

function userSequence(arrayInUse, cbPlaySequence) {
	"use strict";
	$(".simon-button").click(function () {
		//When user clicks a button div enters function to read response
		if (gameParameters.isWaitingForUser == false) {
			// If user clicks when sequence is played
			showUserPrompt("Watch - Don't Click");
			// ignore click and prompt don't click
		} else {
			var divNumber = ($(this).data("myval"));
			// if user clicks when prompted read button number clicked
			playButton(divNumber, "1000");
			// highlight clicked button and its tone
			userResponseArray.push(divNumber);
			//stores this clicked button div number in an array to check response against sequence later
			checkUserInput(arrayInUse, userResponseArray, divNumber);
			// check user input clicked against array of correct answers.  
			// userResponse Array passed to assess if round finished
			if (userResponseArray.length == gameParameters.currentRound) {
				//if user has reached end of round
				gameParameters.currentRound += 1;
				// increase current round by 1
				userResponseArray = [];
				// clear user response array
				setTimeout(cbPlaySequence, 3000, arrayInUse);
				// play sequence of next round
				setTimeout(showUserPrompt, 3000, "Watch");
				// prompt user to watch the sequence
				setTimeout(showUserInfo, 3000, gameParameters.currentRound);
				// update current round to match round played
			} /*if (userResponseArray.length == gameParameters.currentRound)*/
		} /*if (gameParameters.isWaitingForUser */
	}); /* .click(function() */

} /* userSequence function */

function playSequence(arrayToPlay, cbUserSequence, cbPlaySequence) {
	"use strict";
	if (!gameParameters.gameOver) {
		showUserPrompt("Watch");
		// prompt user to watch sequence to copy
		gameParameters.isWaitingForUser = false;
		// prevent user from clicking
		for (var k = 0; k < (gameParameters.currentRound); k++) {
			// up to no of buttons in current round
			var delay = k * 2500;
			// calculate delay required to have the buttons play in sequence and not together.
			setTimeout(playButton, delay, arrayToPlay[k], "1000");
			// plays the current button in the array with the delay calculated
		} /*for loop k*/
		gameParameters.currentSequenceIndexRev = (gameParameters.currentRound - 1);
		// reduce reverse pay sequence index by 1
		delay = gameParameters.currentRound * 2500;
		//calculate delay for next round to start

		if (gameParameters.playForward == true) {
			// If playing in fwd direction
			var prompt = "Repeat (as Seen)";
			// Prompt user to copy sequence as is
		} else { // if playing in reverse
			var prompt = "Repeat (in Reverse)";;
			// prompt user to repeat in reverse
		}

		setTimeout(showUserPrompt, delay, prompt);
		// prompt user to repeat as per direction selected
		setTimeout(function () {
			gameParameters.isWaitingForUser = true;
		}, delay)
		// prevent user clicking for duration of sequence
		cbUserSequence(arrayToPlay, cbPlaySequence);
		// at end of sequence read user responce again
	}
} /* playSequence function*/

function startGame(currentRound, noOfRounds, noOfButtons) {
	"use strict";
	hideButtons();
	// during gameplay hide parameter buttons
	showUserInfo(currentRound);
	// display current round
	var noToLoad = 0;
	// The following defines the array to play to the user
	// var PlayArray = [0, 1, 2, 3, 0, 1, 2, 3];       *** Predictable Array used for testing
	var i = 0;
	var playArray = [];


	for (var i = (noOfRounds); i--;) {
		// create array of button clicks for the number of rounds selected
		noToLoad = Math.trunc(Math.random() * (noOfButtons - 0.001));
		// calculate random number from 0 to 3 to load into array for button click
		console.log(noToLoad);
		playArray.push(noToLoad);
		// store button click in array    
	}

	playSequence(playArray, userSequence, playSequence);
	// Uses the array defined to play the buttons for the user to copy
}

function initiate() {
	startGame(gameParameters.currentRound, gameParameters.noOfRounds, gameParameters.noOfButtons);
}
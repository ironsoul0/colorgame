var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
	setupSquares();
	reset();
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {	
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.background;
			console.log(clickedColor, pickedColor);
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(pickedColor);
				h1.style.background = pickedColor;
				resetButton.textContent = "Play Again?";
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}	
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
	 		if (this.textContent == "EASY") {
	 			numSquares = 3;
	 		} else {
	 			numSquares = 6;
	 		}
			reset();
		});
	}	
}

function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "NEW COLORS";
	//change colors of squares
	for (var i = 0;	i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
	messageDisplay.textContent = "";
}

resetButton.addEventListener("click", reset);

function changeColors(color) { 
	//If user guessed the right color we need to color all squares in that color
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
}

function pickColor() {
	//Getting random color from our possible colors
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var array = [];
	for (var i = 0; i < num; i++) {
		array.push(randomColor());
	}
	return array;	
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}
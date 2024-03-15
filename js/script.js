const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playersLetters = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const messageToPlayer = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


const word = "magnolia";
const guessedLetters = [];

const placeholder = function(word){
   const placeholderLetters = [];
   for ( const letter of word){
    console.log(letter);
    placeholderLetters.push("●");
   }
   wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e){
   e.preventDefault();
   messageToPlayer.innerText = "";
   const guess = playersLetters.value;
   const goodGuess = validateInput(guess);
   if (goodGuess) {
      makeGuess(goodGuess);
  }
});


const validateInput = function(input){
   const acceptedLetter = /[a-zA-Z]/;
   if (input.length === 0){
      messageToPlayer.innerText = "Please enter letter."; 
   } else if ( !(input.length === 1)){
      messageToPlayer.innerText = "Please enter a single letter";
   } else if(!input.match(acceptedLetter)){
      messageToPlayer.innerText =" Please enter from A to Z.";
   } else{
      return input;
   }
};

const makeGuess = function (guess){
   if(guessedLetters.includes(guess)){
      messageToPlayer.innerText = " You already guessed that letter, try again!";
   } else {
      guessedLetters.push(guess);
      console.log( guessedLetters);
   }

};
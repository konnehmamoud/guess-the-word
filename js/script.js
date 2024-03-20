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
  playersLetters.value = "";
});


const validateInput = function(input){
   const acceptedLetter = /[a-zA-Z]/;
   if (input.length === 0){
      messageToPlayer.innerText = "Please enter letter."; 
   } else if (input.length > 1){
      messageToPlayer.innerText = "Please enter a single letter";
   } else if(!input.match(acceptedLetter)){
      messageToPlayer.innerText =" Please enter from A to Z.";
   } else{
      return input;
   }
};

const makeGuess = function (guess){
  guess = guess.toUpperCase();
   
   if(guessedLetters.includes(guess)){
      messageToPlayer.innerText = " You already guessed that letter, try again!";
   } else {
      guessedLetters.push(guess);
      console.log( guessedLetters);
      showGuessedLetters();
      updateWordInProgress(guessedLetters);
   }
 console.log()
};

const showGuessedLetters = function(){
guessedLettersElement.innerHTML ="";
for(const letter of guessedLetters){
   const li = document.createElement("li");
   li.innerText =letter;
   guessedLettersElement.append(li);
}
};

const updateWordInProgress = function(guessedLetters) {
   const wordUpper = word.toUpperCase();
   const wordArray = wordUpper.split("");
   const revealWord = [];

   for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
         console.log(`Letter "${letter}" is included in guessedLetters.`);
         revealWord.push(letter.toUpperCase());
      } else {
        revealWord.push("●");
      }
   }

    revealWord.join("");
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
  };
  
  const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      messageToPlayer.classList.add("win");
      messageToPlayer.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playersLetters = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const messageToPlayer = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function(){
   const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length)
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

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
      updateGuessesRemaining(guess);
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
      StartOver();
     
    }
  };


const updateGuessesRemaining = function (guess){
   const upperWord = word.toUpperCase();
   if ( ! upperWord.includes(guess)){
      messageToPlayer.innerText = `unfortunately, the word has no ${guess}.`;
      remainingGuesses -= 1;
   } else{ messageToPlayer.innerText = `awesome!, the word has the letter ${guess}.`;

   }

if( remainingGuesses===0){
 
   messageToPlayer.innerHTML = `Game over! the word was <span class="highlight">${word}</span>.`;
    StartOver();
} else if (remainingGuesses===1){
   remainingSpan.innerText = `${remainingGuesses} guess`;
} else {
   remainingSpan.innerText = `${remainingGuesses} guesses`;

}

};
 


const StartOver = function(){
guessButton.classList.add("hide");
remaining.classList.add("hide");
guessedLettersElement.classList.add("hide");
playAgainButton.classList.remove("hide");
console.log("Play Again button clicked"); 
};

playAgainButton.addEventListener("click", function () {
  
   messageToPlayer.classList.remove("win");
   guessedLetters = [];
   remainingGuesses = 8;
   remainingSpan.innerText = `${remainingGuesses} guesses`;
   guessedLettersElement.innerHTML = "";
   messageToPlayer.innerText = "";
 
   getWord();
 
 
   guessButton.classList.remove("hide");
   playAgainButton.classList.add("hide");
   remaining.classList.remove("hide");
   guessedLettersElement.classList.remove("hide");
 });
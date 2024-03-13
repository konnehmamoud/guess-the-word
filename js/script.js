const guessLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playersLetters = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaing span");
const messageToPlayer = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia"

const placeholder = function(word){
   const placeholderLetters = [];
   for ( const letter of word){
    console.log(letter);
    placeholderLetters.push("●")
   }
   wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word)

guessButton.addEventListener("click", function (e){
e.preventDefault();
const guess = playersLetters.value;
console.log(guess)
playersLetters.value = "";
});
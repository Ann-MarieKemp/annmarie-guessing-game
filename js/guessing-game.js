/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
// alert();

//generates the winning number for the game
function generateWinningNumber(){
    let answerNum = Math.ceil(Math.random() * 100);
    return answerNum;
}
//shuffles function used later to shuffle the hint array
function shuffle(array){
    let m = array.length;


        // While there remain elements to shuffle…
        while (m) {

          // Pick a remaining element…
          let i = Math.floor(Math.random() * m--);

          // And swap it with the current element.
          let t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
    return array;
}

class Game{
    constructor(){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.isPlaying = true;
    }
    //returns the absolute value of the difference between numbers
    difference(numA, numB){
        numA = this.playersGuess;
        numB = this.winningNumber;
        return Math.abs(numA - numB);
    }
    //returns which number is lower, not actually used in rest of solution
    isLower(numA, numB){
        numA = this.playersGuess;
        numB = this.winningNumber;
        if (numA < numB){
            return true;
        }
        return false;
    }
    //returns the check guess function after checking that the number satisfies the base requirements
    playersGuessSubmission(num){
        this.playersGuess = num;
        if ( num < 1 || num > 100 || typeof num !== 'number'|| Number.isNaN(num)){
            throw alert('That is an invalid guess.');
            
        }
        return this.checkGuess(num);
    }

    //this function takes the guess and returns specific outcomes for each number range
    outcomesAndAddGuess(num){
        let outcome = '';
        this.pastGuesses.push(num); 
        let diffCalc = this.difference(this.winningNumber, this.playersGuess);
        if (diffCalc < 10){
            outcome = `You're burning up!`;
        }
        else if (diffCalc < 25 && diffCalc > 10){
            outcome = `You're lukewarm.`;
        }
        else if (diffCalc < 50 && diffCalc > 25){
            outcome = `You're a bit chilly.`;
            
        } else if (diffCalc < 100 && diffCalc >= 50){
            console.log('getshere')
            outcome = `You're ice cold!`;
        } 
        return outcome;
    }
//returns the appropriate outcome based on the input number
    checkGuess(num){
        this.playersGuess = num;
        let outcome = '';
        //win condition:
        if (num === this.winningNumber){
            outcome =  'You Win!'
            this.isPlaying = false; 
        }
        //if number has already been guessed
        else if (this.pastGuesses.includes(num)){
            outcome =  'You have already guessed that number.';
        }
        //runs the outcomesAndGuess function to return outcomes for each range
        else if (this.pastGuesses.length < 4){
            outcome = this.outcomesAndAddGuess(num);
        }
        //otherwise you lose the game- sets isPlaying to false
        else {
            outcome = 'You Lose.';
            this.isPlaying = false;
        }
        //function returns the statement assigned to outcome;
        return outcome;
    }
//this function provides a hint returning a shuffled array of three numbers that includes the winningNumber
    provideHint(){
        
            let winningNum = this.winningNumber;
            let alt1 = generateWinningNumber();
            let alt2 = generateWinningNumber();
            let numsArray = [winningNum, alt1, alt2];
            let shuffedArray = shuffle(numsArray);
            return shuffedArray;
    }
}
//this function creates a new Game instance- triggered when Play Again is button is clicked
function newGame(){
    return new Game;
}
//sets playGame equal to new game instance on page load.
let playGame = newGame(); 
console.log(playGame);


//this adds click event listener to the hint button, calls the provide hint function and changes the hint text to show hint array. 
function getHintButton(){
    const hintButton = document.getElementById('hintButton');
    hintButton.addEventListener('click', () => {
        if(playGame.isPlaying === true){
            
            let hintText = document.getElementById('hintyHint')
            if (playGame.pastGuesses.length > 3){

                let hintArray = playGame.provideHint();
                hintText.innerHTML = `The answer is one of these three Numbers: ${hintArray[0]}, ${hintArray[1]}, or ${hintArray[2]}`
            } 
            else {
                hintText.innerHTML = `You can't have a hint yet- try another guess!`
            }
        }
    });
}
//calls getHintButton function
getHintButton();

let count = 0; 
function submitGuessAndClear(){
    const guessSubmit = document.getElementById('submit');
    guessSubmit.addEventListener('click', () =>{
        let guessIn = document.querySelector('.guessInput');
        playGame.playersGuess = Number(guessIn.value);
        guessIn.value = ''; 
        let guessResult = playGame.playersGuessSubmission(playGame.playersGuess); 
        if(guessResult !== 'You have already guessed that number.'){
            count++;
            document.getElementById(`guess${count}`).innerHTML = playGame.playersGuess
            document.getElementById('hintyHint').innerHTML = guessResult;
        } else{
            document.getElementById('hintyHint').innerHTML = guessResult; 
        }
    })
}
//calls submitGuessAndClear function on page load
submitGuessAndClear();

//adds click event listener to play again button and resets on page text for hints and prompts. 
function newGameButton(){
    const newGameBut = document.getElementById('newGameButton');
    newGameBut.addEventListener('click', () => {
        playGame = newGame();
        document.getElementById('hintyHint').innerHTML = 'Guess a Number Between 1 and 100!'

        for(let i = 1; i < 6; i++){
            document.getElementById(`guess${i}`).innerHTML = '-'; 
        }
        count = 0;
        document.querySelector('.guessInput').value = ''; 
    });
}
//calls newGameButton function on page load.
newGameButton();


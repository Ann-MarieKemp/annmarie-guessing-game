/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
// alert();


function generateWinningNumber(){
    let answerNum = Math.ceil(Math.random() * 100);
    return answerNum;
}

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
    }
    difference(numA, numB){
        numA = this.playersGuess;
        numB = this.winningNumber;
        return Math.abs(numA - numB);
    }

    isLower(numA, numB){
        numA = this.playersGuess;
        numB = this.winningNumber;
        if (numA < numB){
            return true;
        }
        return false;
    }

    playersGuessSubmission(num){
        this.playersGuess = num;
        if ( num < 1 || num > 100 || typeof num !== 'number'){
            throw alert('That is an invalid guess.');
            
        }
        return this.checkGuess(num);
    }

    checkGuess(num){
        this.playersGuess = num;
        let outcome = '';

        if (num === this.winningNumber){
            outcome =  'You Win!'
        }
        else if (this.pastGuesses.includes(num)){
            outcome =  'You have already guessed that number.';
        }
        else if (this.pastGuesses.length < 4){
            this.pastGuesses.push(num);
            let diffCalc = this.difference(this.winningNumber, this.playersGuess);

            if (diffCalc < 10){
                outcome = `You're burning up!`;
            }
            else if (diffCalc < 25){
                outcome = `You're lukewarm.`;
            }
            else if (diffCalc < 50){
                outcome = `You're a bit chilly.`;
            } else if (diffCalc < 100){
                outcome = `You're ice cold!`;
            }
        }
        else {
            outcome = 'You Lose.';
        }
        return outcome;
    }

    provideHint(){
        
            let winningNum = this.winningNumber;
            let alt1 = generateWinningNumber();
            let alt2 = generateWinningNumber();
            let numsArray = [winningNum, alt1, alt2];
            let shuffedArray = shuffle(numsArray);
            return shuffedArray;
    }
}

function newGame(){
    return new Game;
}

let playGame = newGame(); 
console.log(playGame); 


function getHintButton(){
    const hintButton = document.getElementById('hintButton');
    hintButton.addEventListener('click', () => {
        let hintText = document.getElementById('hintyHint')
        if(playGame.pastGuesses.length > 2){
            console.log('getshere')
       let hintArray = playGame.provideHint();
       hintText.innerHTML = `The answer is one of these three Numbers: ${hintArray[0]}, ${hintArray[1]}, or ${hintArray[2]}`
        } else {
            hintText.innerHTML = `You can't have a hint yet- try another guess!`
        }
    });
}
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
submitGuessAndClear();

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
    })
}
newGameButton();


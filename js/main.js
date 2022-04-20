/* 
ROCK PAPER SCISSORS

To Implement:

ui:
    3 image/icons for rock/paper/scissors
    tally counter to see win/loss ration
    get from fontawesome (hand-scissors, hand-fist, hand  )

features:    
    user clicks one icon to choose hand

    generate random selection for ai (try implement sound?)

    show rock image shake 3 times then display user and ai selection (can use transform(scale) to increase size momentarily)

    some kind of animation to show if win or lose
    add to tally counter, make winner flash green and loser flash red? 

*/

function player() {
    this.score = 0,
    this.hand = 'rock'
}

const human = new player()
const computer = new player()

const humanHand = document.querySelector('#humanHand')
const computerHand = document.querySelector('#computerHand')
const humanWins = document.querySelector('#humanWins')
const computerWins = document.querySelector('#computerWins')

let humanSelection

const handSelectors = document.querySelectorAll('.handSelector')
handSelectors.forEach( (hand) => {
    hand.addEventListener('click', function() {
        human.hand = this.id
        playGame()
    })
})

// clear hand currently displayed
function clearHand(whosHand){
    setTimeout(function(){
    whosHand.classList.remove('fa-hand-back-fist','fa-hand', 'fa-hand-scissors' )
    }, 0);
}

// displayers player selection on screen
function showPlayerHand(){
    if (human.hand == 'rock'){
        humanHand.classList.add('fa-hand-back-fist')
    }
    else if (human.hand == 'paper'){
        humanHand.classList.add('fa-hand')       
    }
    else if (human.hand == 'scissors'){
        humanHand.classList.add('fa-hand-scissors')
    } 
    humanHand.classList.remove('hidden')
}

// shows the computers selection
function showComputerHand(){
    if (computer.hand == 'rock'){
        computerHand.classList.add('fa-hand-back-fist')
    }
    else if (computer.hand == 'paper'){
        computerHand.classList.add('fa-hand')       
    }
    else if (computer.hand == 'scissors'){
        computerHand.classList.add('fa-hand-scissors')
    } 
    computerHand.classList.remove('hidden')
}

const shakers = document.querySelectorAll('.handShaker')

// starts animation on fist shake
function animateShake(){
    gameSound.play();
    shakers.forEach( hand => {
        hand.classList.remove('hidden')
        hand.classList.add('shake')
    })
}

// hides fist shaker
function hideShake(){
    shakers.forEach( hand => {
        hand.classList.remove('shake')
        hand.classList.add('hidden')
    })  
}
// generates random hand for computer
function randomHand(){
    let random = Math.floor(Math.random() * 3)
    if (random == 0){
        computer.hand = 'rock'
    }
    else if (random == 1){
        computer.hand = 'paper'
    }
    else {
        computer.hand = 'scissors'
    }
}

function checkWinner(){
    let winner
    if(human.hand == computer.hand){
        winner = 'draw' // draw
    }
    else if ( 
        (human.hand == 'rock' && computer.hand == 'scissors') || 
        (human.hand == 'paper' && computer.hand == 'rock') || 
        (human.hand == 'scissors' && computer.hand == 'paper') ){ // player wins

        winner = 'human'
        human.score++
    }
    else { // player loses
        winner = 'computer'
        computer.score++
    }
    return winner
}


// updates the scoreboard, changes winner to green and loser to red
function updateUI(winner){
    humanWins.innerText = human.score
    computerWins.innerText = computer.score

    if (winner == 'human'){
        humanHand.classList.add('winner')
        computerHand.classList.add('loser')
    }
    else if (winner == 'computer'){
        humanHand.classList.add('loser')
        computerHand.classList.add('winner')
    }
}

// not working properly, only works once
function resetGame(){ 
    setTimeout(function(){
        humanHand.classList.remove('winner', 'loser')
        computerHand.classList.remove('winner', 'loser')
        // clearHand(humanHand)
        // clearHand(computerHand)
    }, 4500);
}

function blockInput(){
    // blocks user from doing anything until after round completed
    handSelectors.forEach( (hand) => {
        hand.classList.add('disabled')
        setTimeout(()=>{
            hand.classList.remove('disabled')
        }, 5000)
    })
}

// sound for shaker
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.load = function(){
        this.sound.load();
    }

  }

const gameSound = new sound('./assets/rpssfx.mp3')


function playGame(){
    gameSound.load()
    clearHand(humanHand)
    clearHand(computerHand)
    randomHand()
    animateShake()
    blockInput()
    let playGameTimeOut = setTimeout(function(){
        showComputerHand()
        showPlayerHand()
        hideShake()
        updateUI(checkWinner()) 
        let resetTimeOut = setTimeout(function(){
            humanHand.classList.remove('winner', 'loser')
            computerHand.classList.remove('winner', 'loser')
            clearHand(humanHand)
            clearHand(computerHand)
            clearTimeout(resetTimeOut)
            clearTimeout(playGameTimeOut)
        }, 2500);
    }, 3000);
}
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice1 as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, lastScore, winningValue;

resetGame();

function resetGame() {

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    lastScore = 0;

    //the # in the next line allows us to get to the css
    //document.querySelector('#current-' + activePlayer).textContent = dice1; // note that .textContent does not allow us to format the HTML, we need to use innerHTML; # is to use the id in the CSS

    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice1 + '</em>'; //italics

    //var x = document.querySelector('#score-0').textContent;
    //console.log(x);

    document.querySelector('.dice1').style.display = 'none'; // . as in .dice1 is to use the class
    document.querySelector('.dice2').style.display = 'none'; // . as in .dice2 is to use the class

    /*function btn() {
        // Do something here
    }

    document.querySelector('.btn-roll').addEventListener('click', btn); //btn without the () because the function is a callback function that is called by the event listener and not by us
    */

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.btn-roll').style.display = 'block';        
    document.querySelector('.btn-hold').style.display = 'block';        

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('#name-0').textContent = 'Player 1';
    
    document.querySelector('#name-1').textContent = 'Player 2';

}

document.querySelector('.btn-roll').addEventListener('click', function() {

    // 1. Random number
    var dice1 = Math.floor(Math.random()*6) + 1;
    var dice2 = Math.floor(Math.random()*6) + 1;

    // 2. Display the result
    var dice1DOM = document.querySelector('.dice1');
    dice1DOM.style.display = 'block'; //redisplay / unhide
    dice1DOM.src = 'dice-' + dice1 + '.png';

    var dice2DOM = document.querySelector('.dice2');
    dice2DOM.style.display = 'block'; //redisplay / unhide
    dice2DOM.src = 'dice-' + dice2 + '.png';

    var input = document.querySelector('.final-score').value;
    // undefined, zero, null, "" are COERCED to false
    if (input) {
        winningValue = input;
    } else {
        winningValue = 100;
    }

    // 3. Update the round score IF the rolled number was NOT a 1
    // 3.1 if last two scores were 6, player loses all points - extra addition
    if ((lastScore === 12) && ((dice1===6) || (dice2 === 6))) {
        //current player loses entire score
        actualActivePlayer = activePlayer + 1;
        alert('Two sixes. Player '+actualActivePlayer+' loses entire score');
        scores[activePlayer]=0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        roundScore = 0;
        lastScore = 0;
        nextPlayer();
    } else if ((dice1 !== 1) && (dice2 !== 1)) {
        //Add score
        lastScore = dice1+dice2;
        roundScore += dice1+dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

        if ((scores[activePlayer] + roundScore) >= winningValue) {
            setWinner();
        }
    } else {
        //Next player
        nextPlayer();
    }

}); //this one is an anonymous function that is only called here, write the function directly into this event listener method. Its a function without a name, and it cannot be used outside this context

document.querySelector('.btn-hold').addEventListener('click', function() {
    //what to happen when the user clicks the hold button
    //1. add the current score to global score
    scores[activePlayer] += roundScore;
 
    //2. update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //3. Check if player won the game
    if (scores[activePlayer] >= 100) {
        setWinner();
    } else {
        //4. Next player
        nextPlayer();
    }

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //turnary operator : if then else in one line
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function setWinner() {
    document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    document.querySelector('.btn-roll').style.display = 'none';        
    document.querySelector('.btn-hold').style.display = 'none';        
}

/*document.querySelector('.btn-new').addEventListener('click', function () {
    //console.log('New Game?');
    resetGame();
    -- remove this because can just have resetGame as a parameter in the listener, but without the (), because with the () the function will be called immediately
});*/

document.querySelector('.btn-new').addEventListener('click', resetGame);
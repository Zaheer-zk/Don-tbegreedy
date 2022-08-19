'use strict';

//Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const curr0El = document.querySelector('#current--0');
const curr1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const currentLabel = document.querySelector('.current-label');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Game Logic Starts
score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

let diceNo = 0;
let currentScore0 = 0;
let currentScore1 = 0;
let holdScore0 = 0;
let holdScore1 = 0;

btnRoll.addEventListener('click', () => {
  // generating a random dice
  diceNo = Math.floor(Math.random() * 6) + 1;

  // adding dice
  diceEl.classList.remove('hidden');
  diceEl.src = 'dice-' + diceNo + '.png'; // `dice-${diceNo}.png`

  //displaying dice roll
  if (diceNo > 1) {
    // Add dice roll to current score
    if (player0El.classList.contains('player--active')) {
      currentScore0 += diceNo;
      curr0El.textContent = currentScore0;
    } else {
      currentScore1 += diceNo;
      curr1El.textContent = currentScore1;
    }
  } else {
    // Switch Player
    if (player0El.classList.contains('player--active')) {
      currentScore0 = 0;
      curr0El.textContent = currentScore0;
      player0El.classList.remove('player--active');
      player1El.classList.add('player--active');
    } else {
      currentScore1 = 0;
      curr1El.textContent = currentScore1;
      player0El.classList.add('player--active');
      player1El.classList.remove('player--active');
    }
  }
});

// if user holds score
btnHold.addEventListener('click', () => {
  if (player0El.classList.contains('player--active')) {
    // Score < 100
    if (holdScore0 < 100) {
      // Add current  score to total score
      holdScore0 += currentScore0;
      score0El.textContent = holdScore0;
      currentScore0 = 0;
      curr0El.textContent = currentScore0;

      // Switch Player
      player0El.classList.remove('player--active');
      player1El.classList.add('player--active');
    } else if (holdScore0 >= 100) {
      // Current player Won
      currentLabel.textContent = 'Current Player Won 🥇';
      player0El.classList.add('player--winner');
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
    }
  } else {
    if (holdScore1 < 100) {
      // Add current  score to total score
      holdScore1 += currentScore1;
      score1El.textContent = holdScore1;
      currentScore1 = 0;
      curr1El.textContent = currentScore1;

      // Switch Player
      player0El.classList.add('player--active');
      player1El.classList.remove('player--active');
    } else if (holdScore1 >= 100) {
      // Current player Won
      player1El.classList.add('player--winner');
      currentLabel.textContent = 'Current Player Won 🥇';
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
    }
  }
});

// User reset game

btnNew.addEventListener('click', () => {
  currentLabel.textContent = 'Current';
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  currentScore0 = 0;
  currentScore1 = 0;
  holdScore0 = 0;
  holdScore1 = 0;
  score0El.textContent = holdScore0;
  score1El.textContent = holdScore1;
  curr0El.textContent = currentScore0;
  curr1El.textContent = currentScore1;
  diceEl.classList.add('hidden');
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});

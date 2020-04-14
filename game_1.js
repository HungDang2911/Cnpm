"use strict";

const NUM_OF_NOT_ROUND_NUMBERS = 4;
const NUM_OF_ROUND_NUMBERS = 3;
const NUM_OF_NUMBERS = NUM_OF_ROUND_NUMBERS + NUM_OF_NOT_ROUND_NUMBERS;
const MAX_SCORE = 4;

let score = 0;

document.getElementById("start-btn").addEventListener("click", () => {
    clearScreen();
    newGameStage();
    increaseScore();
});



function newGameStage() {
    let roundNumbers = getRoundNumbers();
    let notRoundNumbers = getNotRoundNumbers();
    let numbers = roundNumbers.concat(notRoundNumbers);
    numbers.sort();

    addNumbersToDOM(numbers);
    addNumbersEvent();
}

function clearScreen () {
    let gameScreen = document.getElementById("game-screen");
    let playScreen = document.getElementById("play-screen");

    gameScreen.removeChild(playScreen);
}

function getRoundNumbers() {
    let res = [];
    for(let i = 0; i < NUM_OF_ROUND_NUMBERS; i++) res.push(Math.floor(Math.random() * 10) * 10);
    return res;
}

function getNotRoundNumbers() {
    let res = [];
    for(let i = 0; i < NUM_OF_NOT_ROUND_NUMBERS; i++) res.push(Math.floor(Math.random() * 10) * 10 + Math.floor(Math.random() * 9) + 1);
    return res;
}

function descreaseScore() {
    if (score === 0) return;

    let scoreBar = document.querySelector(`#score-bar:nth-child(${MAX_SCORE})`);
    scoreBall.classList.remove("score-ball-right");
    score--;
}

function increaseScore() {
    let scoreBall = document.querySelector(`#score-bar div:nth-child(${MAX_SCORE - score})`);
    scoreBall.classList.add("score-ball-right");
    
    score++;

    if (score === MAX_SCORE) {
        setTimeout(function() {
            window.location.replace("");
        }, 1000);
    }
}

function addNumbersToDOM(numbersArr) {
    let numbersRow = document.getElementById("numbers-row");

    for (let i = 0; i < NUM_OF_ROUND_NUMBERS + NUM_OF_NOT_ROUND_NUMBERS; i++) {

    }
}

function addNumbersEvent() {
    let numberElements = document.getElementsByClassName("number");
    for (let i = 0; i < NUM_OF_NUMBERS; i++) {
        numberElements[i].addEventListener("dragstart", drag);
    }
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

function allowDrop(event) {
    event.preventDefault();
}
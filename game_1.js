"use strict";

const NUM_OF_NOT_ROUND_NUMBERS = 4;
const NUM_OF_ROUND_NUMBERS = 3;
const NUM_OF_NUMBERS = NUM_OF_ROUND_NUMBERS + NUM_OF_NOT_ROUND_NUMBERS;
const MAX_SCORE = 4;
const LANGUAGES = {
    problems : {
        en: "Find all the round numbers",
        vi: "Tìm tất cả số tròn chục"
    },
    help: {
        en: "Move them to the box",
        vi: "Di chuyển các số vào ô"
    },
    start: {
        en: "start",
        vi: "Bắt đàu"
    }
}

let score = 0;
let numbersOnPlate = 0;

document.getElementById("language").addEventListener("click", (event) => {
    let button = event.target;
    
    if (button.textContent === 'Language: English') console.log(true);
});

document.getElementById("start-btn").addEventListener("click", (event) => {
    clearScreen();
    newGameStage();
});

function newGameStage() {
    let roundNumbers = getRoundNumbers();
    let notRoundNumbers = getNotRoundNumbers();
    let numbers = roundNumbers.concat(notRoundNumbers);
    numbers.sort();
    numbersOnPlate = 0;

    addPlayScreen();
    addStaticElementsToDOM();
    addNumbersToDOM(numbers);
    initDragAndDropNumbers();
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
    score--;

    let scoreBall = document.querySelector(`#score-bar div:nth-child(${MAX_SCORE - score})`);
    scoreBall.classList.remove("score-ball-right");
}

function increaseScore() {
    let scoreBall = document.querySelector(`#score-bar div:nth-child(${MAX_SCORE - score})`);
    scoreBall.classList.add("score-ball-right");
    
    score++;

    if (score === MAX_SCORE) {
        setTimeout(function() {
            window.location.replace("#");
        }, 1000);
    }
    newGameStage();
}

function addPlayScreen() {
    let gameScreen = document.getElementById("game-screen");
    let playScreen = `<div id="play-screen"></div>`
    gameScreen.insertAdjacentHTML("beforeend", playScreen);
}

function addStaticElementsToDOM() {
    let playScreen = document.getElementById("play-screen");
    playScreen.innerHTML = `<h1>Find all the round numbers</h1>
                            <h2>Move them to the box</h2>
                            <div id="numbers-row">               
                            </div>
                            <div id="plate">
                                <div id="plate-wrapper">
                                    <div class="number-slot" id="number-slot-1"></div>
                                    <div class="number-slot" id="number-slot-2"></div>
                                    <div class="number-slot" id="number-slot-3"></div>
                                </div>
                            </div>`;
}

function addNumbersToDOM(numbersArr) {
    let numbersRow = document.getElementById("numbers-row");

    for (let i = 0; i < NUM_OF_NUMBERS; i++) {
        let numberElement = `<div class="number-wrapper id="number-wrapper-${i}">
                                <span id="number-${i}" class="number" draggable="true">${numbersArr[i]}</span>
                            </div>`
        numbersRow.insertAdjacentHTML("beforeend", numberElement);
    }
}

function initDragAndDropNumbers() {
    let numberElements = document.getElementsByClassName("number");
    let plate = document.getElementById("plate");
    
    for (let i = 0; i < NUM_OF_NUMBERS; i++) {
        numberElements[i].addEventListener("dragstart", drag);
    }
    
    plate.addEventListener("dragover", allowDrop);
    plate.addEventListener("drop", drop);
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    numbersOnPlate++;

    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let oldSlot = document.getElementById(data).parentElement;
    document.getElementById(`number-slot-${numbersOnPlate}`).appendChild(document.getElementById(data));

    let chosenNumber = document.getElementById(data);

    if (!isRoundNumber(chosenNumber.textContent)) {
        descreaseScore();
        moveNumberBack(oldSlot, chosenNumber);
        numbersOnPlate--;
    }
    if (numbersOnPlate === 3) increaseScore();
}

function allowDrop(event) {
    event.preventDefault();
}

function isRoundNumber(number) {
    return Number(number) % 10 == 0;
}

function moveNumberBack(parent, child) {
    let blockDivHTML = '<div id="block-div"></div>';
    document.getElementById("play-screen").insertAdjacentHTML("afterbegin", blockDivHTML);

    setTimeout(function() {
        child.style.boxShadow = "0 0 2px 3px red";
        setTimeout(function() {
            child.style.boxShadow = "none";
            parent.appendChild(child);  
            document.getElementById("play-screen").removeChild(document.getElementById("block-div"));
        }, 1000);
    }, 300);
}


import ancients from '../data/ancients.js';
import mythicCards from '../data/mythicCards.js';
import difficulties from '../data/difficulties.js';

const ancientsArray = Array.from(document.querySelectorAll('.ancient'));
const difficultiesArray = Array.from(document.querySelectorAll('.difficulty'));
const startButton = document.querySelector('.start_button')
const firstStageIndicators = document.querySelector('.first_stage_indicators');
const secondStageIndicators = document.querySelector('.second_stage_indicators');
const thirdStageIndicators = document.querySelector('.third_stage_indicators');
const coverImage = document.querySelector('.cover_image');
const cardImage = document.querySelector('.card_image');

let firstStage = [];
let secondStage = [];
let thirdStage = [];
let activeAncient;
let activeDifficulty;

function removeActiveClass(array) {
    array.forEach((e) => {
        e.classList.remove('active');
    })
}

ancientsArray.forEach((e, i) => {
    e.style.backgroundImage = `url(${ancients[i].cardFace})`;
})

difficultiesArray.forEach((e, i) => {
    e.textContent = `${difficulties[i].name}`;
})

ancientsArray.forEach((e, i) => {
    e.addEventListener('click', () => {
        removeActiveClass(ancientsArray);
        e.classList.add('active');
        activeAncient = ancients[i].id;
    })
})

difficultiesArray.forEach((e, i) => {
    e.addEventListener('click', () => {
        removeActiveClass(difficultiesArray);
        e.classList.add('active');
        activeDifficulty = difficulties[i].id
    })
})

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function getCards(ancient = 'azathoth', difficulty = 'normal') {
    let currentAncient = ancients.filter(ancients => ancients.id === ancient)[0];
    console.log(currentAncient);

    let blueCardsFullArray = [];
    blueCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'blue');

    let brownCardsFullArray = [];
    brownCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'brown');

    let greenCardsFullArray = [];
    greenCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'green');

    let blueCardsNeeded = currentAncient.firstStage.blueCards + currentAncient.secondStage.blueCards + currentAncient.thirdStage.blueCards;

    let brownCardsNeeded = currentAncient.firstStage.brownCards + currentAncient.secondStage.brownCards + currentAncient.thirdStage.brownCards;

    let greenCardsNeeded = currentAncient.firstStage.greenCards + currentAncient.secondStage.greenCards + currentAncient.thirdStage.greenCards;

    let blueCardsArray = [];
    let brownCardsArray = [];
    let greenCardsArray = [];

    if (difficulty === 'normal') {

        for (let i = 0; i < blueCardsNeeded; i++) {
            let number = getRandomNumber(blueCardsFullArray.length);
            let cardCheck = blueCardsFullArray[number];

            if (!blueCardsArray) {
                blueCardsArray.push(blueCardsFullArray[number]);
            } else if (!(blueCardsArray.filter(v => v === cardCheck)[0])) {
                blueCardsArray.push(blueCardsFullArray[number]);
            } else {
                while ((blueCardsArray.filter(v => v === cardCheck)[0])) {
                    number = getRandomNumber(blueCardsFullArray.length);
                    cardCheck = blueCardsFullArray[number];
                }
                blueCardsArray.push(blueCardsFullArray[number]);
            }
        }

        for (let i = 0; i < brownCardsNeeded; i++) {
            let number = getRandomNumber(brownCardsFullArray.length);
            let cardCheck = brownCardsFullArray[number];

            if (!brownCardsArray) {
                brownCardsArray.push(brownCardsFullArray[number]);
            } else if (!(brownCardsArray.filter(v => v === cardCheck)[0])) {
                brownCardsArray.push(brownCardsFullArray[number]);
            } else {
                while (brownCardsArray.filter(v => v === cardCheck)[0]) {
                    number = getRandomNumber(brownCardsFullArray.length);
                    cardCheck = brownCardsFullArray[number];
                }
                brownCardsArray.push(brownCardsFullArray[number]);
            }
        }

        for (let i = 0; i < greenCardsNeeded; i++) {
            let number = getRandomNumber(greenCardsFullArray.length);
            let cardCheck = greenCardsFullArray[number];

            if (!greenCardsArray) {
                greenCardsArray.push(greenCardsFullArray[number]);
            } else if (!(greenCardsArray.filter(v => v === cardCheck)[0])) {
                greenCardsArray.push(greenCardsFullArray[number]);
            } else {
                while (greenCardsArray.filter(v => v === cardCheck)[0]) {
                    number = getRandomNumber(greenCardsFullArray.length);
                    cardCheck = greenCardsFullArray[number];
                }
                greenCardsArray.push(greenCardsFullArray[number]);
            }
        }
    }

    setStages();

    function setStages() {
        let preFirstStage = [];
        let preSecondStage = [];
        let preThirdStage = [];

        let firstStageBlueCards = currentAncient.firstStage.blueCards;
        let secondStageBlueCards = currentAncient.secondStage.blueCards;
        let thirdStageBlueCards = currentAncient.thirdStage.blueCards;

        let firstStageBrownCards = currentAncient.firstStage.brownCards;
        let secondStageBrownCards = currentAncient.secondStage.brownCards;
        let thirdStageBrownCards = currentAncient.thirdStage.brownCards;

        let firstStageGreenCards = currentAncient.firstStage.greenCards;
        let secondStageGreenCards = currentAncient.secondStage.greenCards;
        let thirdStageGreenCards = currentAncient.thirdStage.greenCards;

        for (let i = 0; i < firstStageBlueCards; i++) {
            preFirstStage.push(blueCardsArray.shift());
        }

        for (let i = 0; i < firstStageBrownCards; i++) {
            preFirstStage.push(brownCardsArray.shift());
        }

        for (let i = 0; i < firstStageGreenCards; i++) {
            preFirstStage.push(greenCardsArray.shift());
        }

        for (let i = 0; i < secondStageBlueCards; i++) {
            preSecondStage.push(blueCardsArray.shift());
        }

        for (let i = 0; i < secondStageBrownCards; i++) {
            preSecondStage.push(brownCardsArray.shift());
        }

        for (let i = 0; i < secondStageGreenCards; i++) {
            preSecondStage.push(greenCardsArray.shift());
        }

        for (let i = 0; i < thirdStageBlueCards; i++) {
            preThirdStage.push(blueCardsArray.shift());
        }

        for (let i = 0; i < thirdStageBrownCards; i++) {
            preThirdStage.push(brownCardsArray.shift());
        }

        for (let i = 0; i < thirdStageGreenCards; i++) {
            preThirdStage.push(greenCardsArray.shift());
        }

        let array = [];

        array.push(...preFirstStage);

        for (let i = 0; i < preFirstStage.length; i++) {
            firstStage.push(array.splice(getRandomNumber(array.length), 1)[0]);
        }

        array = [];
        array.push(...preSecondStage);

        for (let i = 0; i < preSecondStage.length; i++) {
            secondStage.push(array.splice(getRandomNumber(array.length), 1)[0]);
        }

        array = [];
        array.push(...preThirdStage);

        for (let i = 0; i < preThirdStage.length; i++) {
            thirdStage.push(array.splice(getRandomNumber(array.length), 1)[0]);
        }
    }

    showCardsInDeck();

}

function showCardsInDeck() {
    firstStageIndicators.querySelector('.blue_cards').textContent = firstStage.filter(v => v.color === 'blue').length;
    firstStageIndicators.querySelector('.brown_cards').textContent = firstStage.filter(v => v.color === 'brown').length;
    firstStageIndicators.querySelector('.green_cards').textContent = firstStage.filter(v => v.color === 'green').length;

    secondStageIndicators.querySelector('.blue_cards').textContent = secondStage.filter(v => v.color === 'blue').length;
    secondStageIndicators.querySelector('.brown_cards').textContent = secondStage.filter(v => v.color === 'brown').length;
    secondStageIndicators.querySelector('.green_cards').textContent = secondStage.filter(v => v.color === 'green').length;

    thirdStageIndicators.querySelector('.blue_cards').textContent = thirdStage.filter(v => v.color === 'blue').length;
    thirdStageIndicators.querySelector('.brown_cards').textContent = thirdStage.filter(v => v.color === 'brown').length;
    thirdStageIndicators.querySelector('.green_cards').textContent = thirdStage.filter(v => v.color === 'green').length;

}



coverImage.addEventListener('click', () => {
    if (firstStage.length) {
        cardImage.style.backgroundImage = `url(${firstStage.shift().cardFace})`;
    } else if (secondStage.length) {
        cardImage.style.backgroundImage = `url(${secondStage.shift().cardFace})`;
    } else if (thirdStage.length) {
        cardImage.style.backgroundImage = `url(${thirdStage.shift().cardFace})`;
    }

    showCardsInDeck();
})

startButton.addEventListener('click', () => {
    if (activeAncient && activeDifficulty) {
        firstStage = [];
        secondStage = [];
        thirdStage = [];
        coverImage.style.backgroundImage = "url('./assets/img/mythicCardBackground.png')"
        getCards(activeAncient);
    }
})






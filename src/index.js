import ancients from '../data/ancients.js';
import mythicCards from '../data/mythicCards.js';
import difficulties from '../data/difficulties.js';

const ancientsElement = document.querySelector('.ancients');
const difficultiesArray = Array.from(document.querySelectorAll('.difficulty'));
const startButton = document.querySelector('.start_button')
const firstStageIndicators = document.querySelector('.first_stage_indicators');
const secondStageIndicators = document.querySelector('.second_stage_indicators');
const thirdStageIndicators = document.querySelector('.third_stage_indicators');
const coverImage = document.querySelector('.cover_image');
const cardImage = document.querySelector('.card_image');
const bigCardImage = document.querySelector('.big_card_image');
const main = document.querySelector('.main');


let firstStage = [];
let secondStage = [];
let thirdStage = [];
let activeAncient;
let activeDifficulty;


let ancientsHTML = '';
ancients.forEach((e) => {
    ancientsHTML += `<li class="ancient ${e.id}" style="background-image: url(${e.icon})"><p class="ancient_name hide">${e.name}</p></li>`;
})

ancientsElement.innerHTML = ancientsHTML;
const ancientsArray = Array.from(document.querySelectorAll('.ancient'));

function removeActiveClass(array) {
    array.forEach((e) => {
        e.classList.remove('active');
    })
}

function shuffleArray(array) {
    let shuffledArray = [];
    let tempArray = [];

    tempArray.push(...array);

    for (let i = 0; i < array.length; i++) {
        shuffledArray.push(tempArray.splice(getRandomNumber(tempArray.length), 1)[0]);
    }

    return shuffledArray;
}

// ancientsArray.forEach((e, i) => {
//     e.style.backgroundImage = `url(${ancients[i].cardFace})`;
// })

console.log(ancientsArray);

difficultiesArray.forEach((e, i) => {
    e.textContent = `${difficulties[i].name}`;
})

ancientsArray.forEach((e, i) => {
    e.addEventListener('click', () => {
        ancientsArray.forEach((e) => {
            e.querySelector('p').classList.add('hide');
        });
        removeActiveClass(ancientsArray);
        e.classList.add('active');
        e.querySelector('p').classList.remove('hide');
        activeAncient = ancients[i].id;
    })

    e.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        bigCardImage.src = ancients.filter(v => v.name === e.textContent)[0].cardFace;
        bigCardImage.classList.remove('hide');
        main.classList.add('shadow');
        
    }, false);
})

cardImage.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    console.log(cardImage.style.backgroundImage);
    let cardImageLink = cardImage.style.backgroundImage.replace('url("', '');
    cardImageLink = cardImageLink.replace('")', '');
    console.log(cardImageLink);
    bigCardImage.src = cardImageLink;
    bigCardImage.classList.remove('hide');
        main.classList.add('shadow');
})

window.addEventListener('click', () => {
    if (main.classList.contains('shadow')) {
        bigCardImage.classList.add('hide');
        main.classList.remove('shadow');
        bigCardImage.src = "";
    }
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
    let blueCardsFullArray = [];
    let brownCardsFullArray = [];
    let greenCardsFullArray = [];
    let blueCardsArray = [];
    let brownCardsArray = [];
    let greenCardsArray = [];

    let blueCardsNeeded = currentAncient.firstStage.blueCards + currentAncient.secondStage.blueCards + currentAncient.thirdStage.blueCards;

    let brownCardsNeeded = currentAncient.firstStage.brownCards + currentAncient.secondStage.brownCards + currentAncient.thirdStage.brownCards;

    let greenCardsNeeded = currentAncient.firstStage.greenCards + currentAncient.secondStage.greenCards + currentAncient.thirdStage.greenCards;


    if (difficulty === 'veryEasy') {
        blueCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'blue' && mythicCards.difficulty === 'easy');

        if (blueCardsFullArray.length < blueCardsNeeded) {
            let normalCardsArray = shuffleArray(mythicCards.filter(mythicCards => mythicCards.color === 'blue' && mythicCards.difficulty === 'normal'));

            while (blueCardsFullArray.length < blueCardsNeeded) {
                blueCardsFullArray.push(normalCardsArray.shift());
            }
        }

        brownCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'brown' && mythicCards.difficulty === 'easy');

        if (brownCardsFullArray.length < brownCardsNeeded) {
            let normalCardsArray = shuffleArray(mythicCards.filter(mythicCards => mythicCards.color === 'brown' && mythicCards.difficulty === 'normal'));

            while (brownCardsFullArray.length < brownCardsNeeded) {
                brownCardsFullArray.push(normalCardsArray.shift());
            }
        }

        greenCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'green' && mythicCards.difficulty === 'easy');

        if (greenCardsFullArray.length < greenCardsNeeded) {
            let normalCardsArray = shuffleArray(mythicCards.filter(mythicCards => mythicCards.color === 'green' && mythicCards.difficulty === 'normal'));

            while (greenCardsFullArray.length < greenCardsNeeded) {
                greenCardsFullArray.push(normalCardsArray.shift());
            }
        }

    } else if (difficulty === 'easy') {
        blueCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'blue' && mythicCards.difficulty !== 'hard');

        brownCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'brown' && mythicCards.difficulty !== 'hard');

        greenCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'green' && mythicCards.difficulty !== 'hard');
    } else if (difficulty === 'normal') {
        blueCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'blue');

        brownCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'brown');

        greenCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'green');
    } else if (difficulty === 'hard') {
        blueCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'blue' && mythicCards.difficulty !== 'easy');

        brownCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'brown' && mythicCards.difficulty !== 'easy');

        greenCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'green' && mythicCards.difficulty !== 'easy');
    } else if (difficulty === 'veryHard') {
        blueCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'blue' && mythicCards.difficulty === 'hard');

        if (blueCardsFullArray.length < blueCardsNeeded) {
            let normalCardsArray = shuffleArray(mythicCards.filter(mythicCards => mythicCards.color === 'blue' && mythicCards.difficulty === 'normal'));

            while (blueCardsFullArray.length < blueCardsNeeded) {
                blueCardsFullArray.push(normalCardsArray.shift());
            }
        }

        brownCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'brown' && mythicCards.difficulty === 'hard');

        if (brownCardsFullArray.length < brownCardsNeeded) {
            let normalCardsArray = shuffleArray(mythicCards.filter(mythicCards => mythicCards.color === 'brown' && mythicCards.difficulty === 'normal'));

            while (brownCardsFullArray.length < brownCardsNeeded) {
                brownCardsFullArray.push(normalCardsArray.shift());
            }
        }

        greenCardsFullArray = mythicCards.filter(mythicCards => mythicCards.color === 'green' && mythicCards.difficulty === 'hard');

        if (greenCardsFullArray.length < greenCardsNeeded) {
            let normalCardsArray = shuffleArray(mythicCards.filter(mythicCards => mythicCards.color === 'green' && mythicCards.difficulty === 'normal'));

            while (greenCardsFullArray.length < greenCardsNeeded) {
                greenCardsFullArray.push(normalCardsArray.shift());
            }
        }
    }

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
        if (thirdStage.length === 0) {
            coverImage.classList.add('hide');
        }
    }


    showCardsInDeck();
})

startButton.addEventListener('click', () => {
    if (activeAncient && activeDifficulty) {
        firstStage = [];
        secondStage = [];
        thirdStage = [];
        coverImage.style.backgroundImage = "url('./assets/img/mythicCardBackground.jpg')"
        cardImage.style.backgroundImage = "url('')"
        coverImage.classList.remove('hide');
        getCards(activeAncient, activeDifficulty);
    }
})






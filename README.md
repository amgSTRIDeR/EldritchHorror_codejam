# Eldritch Horror - Board Game Helper

![Eldritch Horror](https://github.com/user-attachments/assets/9dbae411-5b10-4ed4-a445-76b2c586eb5f)

## 🎮 Live Demo

**[Open Application](https://amgstrider.github.io/EldritchHorror_codejam/)**

## 📖 Description

A web application designed to assist in preparing for the "Eldritch Horror" board game. The app automates one of the most complex and time-consuming stages of game preparation - building the Mythos deck according to the game rules.

This is an educational project created as part of a CodeJam assignment, demonstrating skills in JavaScript, DOM manipulation, and implementation of complex algorithms.

## ✨ Features

- **Ancient Selection**: 16 different Ancients with unique characteristics and deck requirements
- **5 Difficulty Levels**:
  - Very Easy - only cards with snowflakes
  - Easy - excludes cards with tentacles
  - Normal - all cards without exceptions
  - Hard - excludes cards with snowflakes
  - Very Hard - only cards with tentacles
- **Automatic Deck Shuffling** according to game rules:
  - Distribution of cards by colors (green, blue, brown)
  - Formation of decks for each of the three game stages
  - Proper card sequencing
- **Deck Status Tracker**: displays the number of cards of each color at each stage
- **Interactive Card Viewing**: view Mythos cards by clicking
- **Tooltips**: information about card distribution when hovering over an Ancient

## 🛠️ Technologies

- **HTML5** - application structure
- **CSS3** - styling and animations
- **JavaScript (ES6+)** - application logic
- **Modular Architecture** - separation of data and logic

## 📂 Project Structure

```
├── index.html          # Main page
├── css/
│   └── style.css      # Application styles
├── src/
│   └── index.js       # Main application logic
├── data/
│   ├── ancients.js    # Ancient data
│   ├── mythicCards.js # Mythos cards data
│   └── difficulties.js # Difficulty settings
└── assets/
    ├── Ancients/      # Ancient images
    ├── MythicCards/   # Mythos card images
    └── img/           # Other images
```

## 🚀 How to Use

1. **Choose an Ancient** - click on one of the Ancient images at the top of the screen
2. **Select difficulty level** - choose one of five difficulty levels
3. **Click "Face the Ancient" button** - start the game and get a shuffled deck
4. **View cards** - click on cards to view them
5. **Track progress** - use the tracker to monitor deck status

## 💡 Implementation Features

### Deck Shuffling Algorithm

1. Determining the required number of cards of each color based on the selected Ancient's characteristics
2. Filtering cards according to the selected difficulty level
3. Random shuffling of selected cards by color
4. Formation of decks for each of the three game stages
5. Combining stages into a single deck in the correct sequence

### Additional Features

- Includes Ancients and cards from game expansions
- Hovering over an Ancient shows a tooltip with card distribution by stages
- Right-click on an Ancient or Mythos card image to view it
- Implemented fallback to normal difficulty cards when specific difficulty cards are insufficient

## 🎯 Local Installation

1. Clone the repository:
```bash
git clone https://github.com/amgSTRIDeR/EldritchHorror_codejam.git
```

2. Open `index.html` in a browser or start a local server:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server
```

3. Open `http://localhost:8080` in your browser

## 📝 About the Board Game

"Eldritch Horror" is a cooperative horror board game based on the works of H.P. Lovecraft. Players travel the world, investigate mysteries, and battle monsters to prevent the awakening of an Ancient One.

**Fun Fact**: In addition to the physical version of the game, there is a tabletop game simulator "Tabletop Simulator" available on Steam Workshop that includes "Eldritch Horror" with all expansions.

## 👨‍💻 Author

Project created as part of CodeJam educational assignment

## 📄 License

This project is created for educational purposes.

---

⭐ If you enjoyed this project, give it a star on GitHub!

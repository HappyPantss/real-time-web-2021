# Real Time Web @cmda-minor-web 2020-2021
This is the repository for Real-Time Web @cmda-minor-web 2020/2021 @cmda-minor-web. In this project I am making my own Unscramble game where you can play real time (multi-user) with your friends! Unscramble the word first, and get the most points! 💬🥇

# 🌍 Live version
This is the repository for frontend-applications CMD 2020/2021. Live version: https://get-scrambled.herokuapp.com/

## 🚀 Installation
**Clone the repository:**<br>
`https://github.com/HappyPantss/real-time-web-2021.git`

**Install NPM:**<br>
`npm install`

### Usage
**Start the local server.**<br>
`npm run start`

**Visit the local website in your browser with:**<br>
`http://localhost:3000/`

## 💬 Concept
In this course I will make a real time web app. Using Socket.IO. During this course I will learn how to build a real-time application. I will learn techniques to setup an open connection between the client and the server. This will enable me to send data in real-time both ways, at the same time.

### 🔨 Ideas
The ideas that I had were to make a:
* Scramble game
* Pixelart page

### ✏️ Sketches
![Two Ideas](https://i.imgur.com/cluFxRW.png)

## ✨ Functionalities
### Must haves
* Add support for nicknames.
* Boradcast a message to connected users when someone connects or disconnects.
* Add "{user} is typing" functionality

## 📈 Data
### API
In this project I don't use an API, because it was to difficult to find one. That is why I choose for a CDN script/ NPM package. This script has an array full of random English words.<br>
**NPM Package:** https://www.npmjs.com/package/random-words<br>
**Script tag:** https://cdn.jsdelivr.net/npm/random-words@1.1.1/index.min.js<br>
**All files:** https://www.jsdelivr.com/package/npm/random-words
### Data Life Cycle Diagram
![Data Life Cycle Diagram](https://i.imgur.com/Q1eA1Ti.png)
### Actor Diagram
![Actor Diagram](https://i.imgur.com/5YAw0Ok.jpg)
### Real-time Events
| Socket | Description |
| --- | --- |
| `connection` | Know when a user has connected. |
| `newUser` | Checks if the nicknane/ username is still available. |
| `playGame` | When the button to start the game is pressed, hide the button. |
| `tempWord` | Listen to the answer of the user. |
| `randWords` | The scrambled word. |
| `newWords` | The solution word. |
| `answerCorrect` | Tell the user if they answered it correctly, otherwise tell them what the correct word was. |
| `message` | The chat message with nickname. |
| `disconnect` | Disconnects the user from the game.  |
| `usernames` | Show all the users that are online in a list. |
| `userJoined` | Send a message to the other clients when a user joined/ connected. |
| `userLeft` | Send a message to the other clients when a user left/ disconnected. |

# 📘 License
This project is released under the under terms of the MIT License.
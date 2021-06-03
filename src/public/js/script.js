const socket = io()

let messages = document.querySelector('section ul')
let gameForm = document.querySelector('#gameForm')
let input = document.querySelector('#answer')
let nickForm = document.querySelector('#setNick')
let nickError = document.querySelector('#nickError')
let nickBox = document.querySelector('#nickname')
let nickWrap = document.querySelector('#nickWrap')
let game = document.querySelector('#game')
let chat = document.querySelector('#chat')
let users = document.querySelector("#users")
let userList = document.querySelector("#userList")
let listItem = document.querySelector("li")

// Set variables for the timer
var timer;
var timeLeft = 20; // seconds
let goBtn = document.querySelector('.goBtn')
let timerSpan = document.querySelector('#timer')

// Check if the username already exists, if so show error message, if not continue to the game
nickForm.addEventListener('submit', (event) => {
    event.preventDefault()
    socket.emit('new user', nickBox.value, function(data) {
        if (data) {
            nickWrap.style.display = "none";
            game.style.display = "flex";
            chat.style.display = "flex";
            users.style.display = "flex";
        } else {
            nickError.innerHTML = "That username is already taken! Try Again."
        }
    })
    nickBox.value = ""
})

// Set the users in the user list
socket.on('usernames', function(data) {
    let html = ''
    let i;
    for (i = 0; i < data.length; i++) {
        html += data[i] + '<br>'
    }
    userList.innerHTML = html
})

// See if the message input is empty, if so, don't send something.
gameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value) {
        socket.emit('message', input.value)
        input.value = ''
    }
})

// Show message when a user has joined
socket.on('userJoined', userJoined => {
    sendMessage(userJoined, false);
})

// Show a Message of The Day in the chat when someone joines
socket.on('motd', motd => {
    sendMessage(motd, false);
})

// Show the message, with message and nickname
socket.on('message', message => {
    sendMessage(message.msg, message.nick);
})

// Show message when a user has left
socket.on('userLeft', userLeft => {
    sendMessage(userLeft, false);
})

// User can send messages before, during and after the game.
// If you play the game, you can chat and guess at the same time, you don't get feedback if the answer is not correct
function sendMessage(message, nickname) {
    let element = document.createElement('li')
    element.classList.add('message')
    if (nickname) {
        element.innerHTML = `<p class="text_meta">${nickname}</p>`;
    }
    element.innerHTML = element.innerHTML + `
      <p class="text">
        <span>${message}</span>
      </p>
    `;

    document.querySelector('.chat_messages').appendChild(element)

    messages.scrollTop = messages.scrollHeight
}

// Game
let msg = document.querySelector('.msg')
let btn = document.querySelector('.btn')

let guess = document.querySelector('#answer')
let btnAnswer = document.querySelector('.btnAnswer')
let play = false;
let newWords = ""
let randWords = ""
let sWords = wordList

// What to do when the timer runs out
function gameOver() {
    // This cancels the setInterval, so the updateTimer stops getting called
    clearInterval(timer)
}

function updateTimer() {
    timeLeft = timeLeft - 1
    if (timeLeft >= 0) {
        console.log(timeLeft)
    } else {
        console.log('Done!')
        clearInterval(timer)
        timeLeft = 20
        start()
        socket.emit('playGame', playGame())
    }
}

function start() {
    timeLeft = 20
        // setInterval is a built-in function that will call the given function
        // every N milliseconds (1 second = 1000 ms)
    timer = setInterval(updateTimer, 1000)

    // It will be a whole second before the time changes, so we'll call the update
    // once ourselves
    updateTimer()
}

// Start game and timer
btn.addEventListener('click', function() {
    if (!play) {
        socket.emit('playGame', playGame())
        start()
    }
})

// Get a random word out of the list
const createNewWords = () => {
    let ranNum = Math.floor(Math.random() * sWords.length)
    let newTempSwords = sWords[ranNum]
    return newTempSwords
}

// Scramble word 
const scrambleWords = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        let temp = arr[i]
        let j = Math.floor(Math.random() * (i + 1))

        arr[i] = arr[j]
        arr[j] = temp
    }

    return arr
}

// When game is played, make show the word that was scrambled as 1 word
function playGame() {
    play = true
    guess.classList.toggle('hidden')
    newWords = createNewWords()

    // Join all letters to one word
    randWords = scrambleWords(newWords.split("")).join("")

    socket.emit('newWords', newWords)
    socket.emit('randWords', randWords)
}

// Give the answer to the server
socket.on('answer', (answerWord) => {
    newWords = answerWord
})

// Give the right answer and scrambled word to the server and write to all clients.
socket.on('word', (scrambledWord) => {
    btnAnswer.innerHTML = "Guess"
    msg.innerHTML = scrambledWord
})

var clicks = 0;

// Check if answer is correct or not
socket.on('playing', () => {
    btn.style.display = "none";

    btnAnswer.addEventListener('click', function() {
        if (input.value == newWords) {
            socket.on('tellYou', (tellYou) => {
                sendMessage(tellYou, false);
            })

            clicks += 1;
            document.getElementById("clicks").innerHTML = clicks;
            socket.emit('answerCorrect', newWords)

            // reset timer
            timeLeft = 20

            // restart game if answered correctly.
            socket.emit('playGame', playGame())
        }
    })
})

// If one user has answered correctly, show other user the word is already guessed right.
socket.on('tellOther', (tellOther) => {
    sendMessage(tellOther, false);
})
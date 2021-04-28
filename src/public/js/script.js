export const socket = io()
import './game.js'

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

socket.on('usernames', function(data) {
    let html = ''
    let i;
    for (i = 0; i < data.length; i++) {
        html += data[i] + '<br>'
    }
    userList.innerHTML = html
})

gameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value) {
        socket.emit('message', input.value)
        input.value = ''
    }
})

// socket.on('message', function(message) {
//     let element = document.createElement('li')
//     element.textContent = message
//     messages.appendChild(element)
//     messages.scrollTop = messages.scrollHeight
// })

socket.on('userJoined', userJoined => {
    sendMessage(userJoined, false);
})

socket.on('motd', motd => {
    sendMessage(motd, false);
})

socket.on('message', message => {
    sendMessage(message.msg, message.nick);
})

socket.on('userLeft', userLeft => {
    sendMessage(userLeft, false);
})

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

// GAME
let msg = document.querySelector('.msg')
let btn = document.querySelector('.btn')

let guess = document.querySelector('#answer')
let btnAnswer = document.querySelector('.btnAnswer')
let play = false;
let newWords = ""
let randWords = ""
let sWords = wordList

btn.addEventListener('click', function() {
    // btn.style.display = "none";
    if (!play) {
        // playGame()
        socket.emit('playGame', playGame())
    }

    setInterval(function() {
        playGame()
    }, 10000);
})

socket.on('playing', () => {
    btn.style.display = "none";
})

const createNewWords = () => {
    let ranNum = Math.floor(Math.random() * sWords.length)
        // console.log(ranNum)
    let newTempSwords = sWords[ranNum]
        // console.log(newTempSwords.split(""))
    return newTempSwords
}

const scrambleWords = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        let temp = arr[i]
            // console.log(temp)
        let j = Math.floor(Math.random() * (i + 1))
            // console.log(i);
            // console.log(j);

        arr[i] = arr[j]
        arr[j] = temp
    }

    return arr
}

function playGame() {
    play = true
    btnAnswer.innerHTML = "Guess"
    guess.classList.toggle('hidden')
    newWords = createNewWords()
    randWords = scrambleWords(newWords.split("")).join("")

    // msg.innerHTML = randWords
    socket.emit('newWords', newWords)
    socket.emit('randWords', randWords)
}

socket.on('word', (finalWord) => {
    console.log('finalWord: ' + finalWord)
    msg.innerHTML = finalWord
})

socket.on('answer', (answerWord) => {
    console.log('answerWord: ' + answerWord)
})

btnAnswer.addEventListener('click', function() {
    let tempWord = guess.value;
    socket.emit('tempWord', tempWord)

    socket.on('guess', (guessedWord) => {
        console.log('guessedWord: ' + guessedWord)
        console.log('newWords: ' + newWords)
        if (guessedWord === newWords) {
            console.log('Correct')

            msg.innerHTML = `Awesome It's Correct. It Is ${newWords}.`

            setTimeout(function() {
                playGame()
            }, 1000);
        }
    })
})
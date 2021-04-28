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
const msg = document.querySelector('.msg')

socket.on('word', (finalWord) => {
    msg.innerHTML = finalWord
})
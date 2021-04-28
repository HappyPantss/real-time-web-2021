var socket = io()
var messages = document.querySelector('section ul')
var gameForm = document.querySelector('#gameForm')
var input = document.querySelector('#answer')
var nickForm = document.querySelector('#setNick')
var nickError = document.querySelector('#nickError')
var nickBox = document.querySelector('#nickname')
var nickWrap = document.querySelector('#nickWrap')
var game = document.querySelector('#game')
var chat = document.querySelector('#chat')
var users = document.querySelector("#users")
var userList = document.querySelector("#userList")

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
    var html = ''
    var i;
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
//     var element = document.createElement('li')
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
    var element = document.createElement('li')
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
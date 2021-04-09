let socket = io()
let messages = document.querySelector('section ul')
let input = document.querySelector('input')

let words = ["amsterdam", "design", "school"];
let scrambled = ["merdsatam", "dgenis", "hsoloc"];

let playing = true;

while (playing) {
    let randomNumber = Math.floor(Math.random() * words.length);

    let randomWord = scrambled[randomNumber];

    alert(randomWord);

    let userInput = prompt("Can you unscramble this word? " + randomWord);

    console.log(userInput);

    if (userInput == words[randomNumber]) {
        alert("Great job!");
    } else {
        alert("Sorry you were incorrect. The answer is: " + words[randomNumber]);
    }

    playing = confirm("Press OK To keep playing or Cancel to quit");
}

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value) {
        socket.emit('message', input.value)
        input.value = ''
        input.focuc()
    }
})

socket.on('message', function(message) {
    let element = document.createElement('li')
    element.textContent = message
    messages.appendChild(element)
    messages.scrollTop = messages.scrollHeight
})
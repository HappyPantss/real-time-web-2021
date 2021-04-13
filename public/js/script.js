const msg = document.querySelector('.msg')
const guess = document.querySelector('input')
const btn = document.querySelector('.btn')
let play = false;
let newWords = ""
let randWords = ""
let sWords = ["amsterdam", "design", "school"];

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

btn.addEventListener('click', function() {
    if (!play) {
        play = true
        btn.innerHTML = "Guess"
        guess.classList.toggle('hidden')
        newWords = createNewWords()
        randWords = scrambleWords(newWords.split("")).join("")
            // console.log(randWords.join(""))
        msg.innerHTML = randWords
    } else {
        let tempWord = guess.value;
        if (tempWord === newWords) {
            console.log('Correct')
            play = false
            msg.innerHTML = `Awesome It's Correct. It Is ${newWords}.`
            btn.innerHTML = "Start Again"
        } else {
            console.log('Incorrect')
            msg.innerHTML = `Sorry It's Not Correct. It was ${randWords}. Try again.`
        }
    }
})


var socket = io()
var messages = document.querySelector('section ul')
var input = document.querySelector('input')

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value) {
        socket.emit('message', input.value)
        input.value = ''
    }
})

socket.on('message', function(message) {
    var element = document.createElement('li')
    element.textContent = message
    messages.appendChild(element)
    messages.scrollTop = messages.scrollHeight
})
// import { socket } from './script.js';
// const btn = document.querySelector('.btn')

// const msg = document.querySelector('.msg')
// const guess = document.querySelector('#answer')
// const btnAnswer = document.querySelector('.btnAnswer')
// let play = false;
// let newWords = ""
// let randWords = ""
// let sWords = wordList

// btn.addEventListener('click', function() {
//     if (!play) {
//         playGame()
//     }
// })

// const createNewWords = () => {
//     let ranNum = Math.floor(Math.random() * sWords.length)
//         // console.log(ranNum)
//     let newTempSwords = sWords[ranNum]
//         // console.log(newTempSwords.split(""))
//     return newTempSwords
// }

// const scrambleWords = (arr) => {
//     for (let i = arr.length - 1; i >= 0; i--) {
//         let temp = arr[i]
//             // console.log(temp)
//         let j = Math.floor(Math.random() * (i + 1))
//             // console.log(i);
//             // console.log(j);

//         arr[i] = arr[j]
//         arr[j] = temp
//     }

//     return arr
// }

// function playGame() {
//     play = true
//     btnAnswer.innerHTML = "Guess"
//     guess.classList.toggle('hidden')
//     newWords = createNewWords()
//     randWords = scrambleWords(newWords.split("")).join("")

//     socket.emit('randWords', randWords)
// }

// btnAnswer.addEventListener('click', function() {
//     let tempWord = guess.value;
//     if (tempWord === newWords) {
//         console.log('Correct')

//         msg.innerHTML = `Awesome It's Correct. It Is ${newWords}.`

//         setTimeout(function() {
//             playGame()
//         }, 1000);
//     }
// })

// // btn.addEventListener('click', function() {
// //     socket.emit('game');
// // })
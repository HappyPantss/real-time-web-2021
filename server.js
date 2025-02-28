const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(server)
const bodyParser = require('body-parser')

const nicknames = []

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(express.static('src/public'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/public/views'))

app.get('/', function(req, res) {
    res.render("general")
});

io.on('connection', (socket) => {

    socket.emit('motd', 'Welcome to Get Scrambled!')

    socket.broadcast.emit('userJoined', 'A user has joined the chat.')

    socket.on('new user', function(data, callback) {
        if (nicknames.indexOf(data) != -1) {
            callback(false)
        } else {
            callback(true)
            socket.nickname = data;
            nicknames.push(socket.nickname)
            updateNicknames()
        }
    })

    socket.on('playGame', function(playing) {
        io.emit('playing', playing)
    })

    socket.on('tempWord', function(guess) {
        io.emit('guess', guess)
    })

    socket.on('newWords', function(answer) {
        io.emit('answer', answer)
    })

    socket.on('answerCorrect', (newWords) => {
        socket.broadcast.emit('tellOther', 'Someone else answered correctly! The word was: ' + newWords);
        socket.emit('tellYou', 'You are correct! Awesome! It was: ' + newWords);
    })

    socket.on('randWords', function(word) {
        io.emit('word', word)
    })

    console.log('a user connected')

    function updateNicknames() {
        io.sockets.emit('usernames', nicknames)
    }

    socket.on('message', (message) => {
        io.emit('message', { msg: message, nick: socket.nickname })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')

        io.emit('userLeft', 'A user left the chat!')

        if (!socket.nickname) return
        nicknames.splice(nicknames.indexOf(socket.nickname), 1)
        updateNicknames()
    })
})

server.listen(port, () => {
    console.log('listening on port ', 'http://localhost:' + port)
})
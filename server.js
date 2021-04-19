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

app.use(express.static('public'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'public/views'))

app.get('/', function(req, res) {
    res.render("login")
});

app.get('/game', function(req, res) {
    res.render("game", {
        username: req.query.username
            // roomId: req.query.roomId
    })
});

io.on('connection', (socket) => {

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

    console.log('a user connected')

    function updateNicknames() {
        io.sockets.emit('usernames', nicknames)
    }

    socket.on('message', (message) => {
        // console.log('message: ' + message)
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        if (!socket.nickname) return
        nicknames.splice(nicknames.indexOf(socket.nickname), 1)
        updateNicknames()

        console.log('user disconnected')
    })
})

server.listen(port, () => {
    console.log('listening on port ', port)
})
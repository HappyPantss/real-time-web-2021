const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(server)
const bodyParser = require('body-parser')

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
        username: req.query.username,
        roomId: req.query.roomId
    })
});

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', (message) => {
        // console.log('message: ' + message)
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, () => {
    console.log('listening on port ', port)
})
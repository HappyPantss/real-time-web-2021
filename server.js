const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render("login")
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
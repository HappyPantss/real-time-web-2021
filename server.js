const e = require('express')
const express = require('express')
const { type } = require('os')
const app = express()
const http = require('http').createServer(app) // Make http server to visit site locally
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.port || 3000 // This port line makes sure you can use it for Heroku


app.use(express.static(path.resolve('public'))) // Makes the public map the static map 

io.on('connection', (socket) => { // What to do when a user connects?
    console.log('A user connected') // Log 'A user connected' when a user opened the page

    socket.on('message', (message) => {
        // console.log('Message: ' + message)
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

http.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})
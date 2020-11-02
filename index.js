const express = require('express')
const app = express()
require('dotenv').config()

//static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname+'/public/css'))
app.use('/img', express.static(__dirname+'/public/img'))
app.use('/js', express.static(__dirname+'/public/js'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.listen(process.env.PORT, () => {
    console.log('server running on ', process.env.PORT)
})
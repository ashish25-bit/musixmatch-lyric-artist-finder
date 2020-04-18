const express = require('express')
const path = require('path')

const app = express()
// setting the static folder
app.use(express.static(path.join(__dirname, '/public')))


app.get('/' , (req,res) => {
    res.sendFile('/index.html')
})

app.get('/artist/:artist/:id' , (req,res) => {
    res.sendFile((path.join(__dirname, 'public/artist.html')))
})

app.get('/album/:artist/:id' , (req,res) => {
    res.sendFile((path.join(__dirname, 'public/album.html')))
})

app.get('/track/:artist/:track' , (req,res) => {
    res.sendFile((path.join(__dirname, 'public/track.html')))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
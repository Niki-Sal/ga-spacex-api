const express = require('express')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('Welcome to GA Space X API')
})

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})
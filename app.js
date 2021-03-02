const express = require('express');
const axios = require('axios');

// Set up App
const app = express();
const PORT = process.env.PORT || 8000;

// Route
app.get('/', (req, res) => {
    res.send('Welcome to GA Space X API');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
const express = require('express');
const axios = require('axios');

// Set up App
const app = express();
const PORT = process.env.PORT || 8000;

// Run axios
axios.get('https://api.spacexdata.com/v4/capsules')
.then(response => {
    console.log(response.data);
});

// Route
app.get('/', (req, res) => {
    res.send('Welcome to GA Space X API');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

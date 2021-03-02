const express = require('express');
const axios = require('axios');

// Set up App
const app = express();
const PORT = process.env.PORT || 8000;

// Database
const db = require('./models');


// Route
app.get('/', (req, res) => {
    res.send('Welcome to GA Space X API');
});

app.get('/fetch-capsules', async (req, res) => {
    // Run axios
    const response = await axios.get('https://api.spacexdata.com/v4/capsules');
    const data = response.data; // array of objects [{}, {}, {}]
    // add each object info to DB
    for (let i = 0; i < data.length; i++) {
        let capsuleObject = data[i]; // object
        const { serial, type, water_landings } = capsuleObject; // destructuring

        db.Capsule.create({
            serial: serial,
            type: type,
            waterLandings: water_landings
        }, (err, newCapsule) => {
            console.log(newCapsule);
        })
    }

    res.json(data);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

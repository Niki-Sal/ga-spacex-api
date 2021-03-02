const express = require('express');
const axios = require('axios');

// Set up App
const app = express();
const PORT = process.env.PORT || 8000;

// Database
const db = require('./models');
const query = 'https://api.spacexdata.com/v4/dragons'


// Route
app.get('/v1', (req, res) => {
    res.send('Welcome to GA Space X API');
});

app.get('/v1/fetch-dragons', async (req, res) => {
    // Run axios
    const response = await axios.get(query);
    const data = response.data; // array of objects [{}, {}, {}]
    // add each object info to DB
    for (let i = 0; i < data.length; i++) {
        let dragonObject = data[i]; // object
        const { serial, type, water_landings } = dragonObject; // destructuring

        db.Dragon.create({
            serial: serial,
            type: type,
            waterLandings: water_landings
        }, (err, newCapsule) => {
            console.log(newCapsule);
        });
    }

    res.json(data);
});

app.get('/v1/fetch-dragons-again', async (req, res) => {
    const response = await axios.get(query);
    const data = response.data; // array of objects [{}, {}, {}]

    const newDragon = await data.map((dragonObject) => {
        const { serial, type, water_landings } = dragonObject; // destructuring
        const resultObj = {
            serial: serial,
            type: type,
            waterLandings: water_landings
        }
        return resultObj;
    });
    // res.json(newDragons);
    // db.Dragons.collection.drop();
    // Add newDragonds to DB
    const allNewDragons = await db.Dragons.create(newDragons);
    res.json(allNewDragons);
    // const allDragonds = await db.Dragons.find();
});

app.get('/v1/dragons', async (req, res) => {
    const fetchDragon = await db.Dragon.find(); // array of objects
    res.json(fetchDragon);
});

app.get('/v1/dragons/:serial', async (req, res) => {
    // let serial = req.params.serial;
    const { serial } = req.params;
    const fetchDragon = await db.Dragon.find({ serial });
    res.json(fetchDragon);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

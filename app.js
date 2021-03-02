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
        const { name, type, active, crew_capacity } = dragonObject; // destructuring

        db.Dragon.create({
            name: name,
            type: type,
            active: active,
            crewCapacity: crew_capacity
        }, (err, newDragon) => {
            console.log(newDragon);
        });
    }

    res.json(data);
});

app.get('/v1/fetch-dragons-again', async (req, res) => {
    const response = await axios.get(query);
    const data = response.data; // array of objects [{}, {}, {}]

    const newDragon = await data.map((dragonObject) => {
        const { name, type, active, crew_capacity } = dragonObject; // destructuring
        const resultObj = {
            name: name,
            type: type,
            active: active,
            crewCapacity: crew_capacity
        }
        return resultObj;
    });
    // res.json(newDragons);
    // db.Dragons.collection.drop();
    // Add newDragonds to DB
    const allNewDragons = await db.Dragon.create(newDragon);
    res.json(allNewDragons);
    // const allDragonds = await db.Dragons.find();
});

app.get('/v1/dragons', async (req, res) => {
    const fetchDragon = await db.Dragon.find(); // array of objects
    res.json(fetchDragon);
});

app.get('/v1/dragons/:name', async (req, res) => {
    // let serial = req.params.serial;
    const { name } = req.params;
    const fetchDragon = await db.Dragon.find({ name });
    res.json(fetchDragon);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

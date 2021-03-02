const express = require('express');
const axios = require('axios');

// Set up App
const app = express();
const PORT = process.env.PORT || 8000;

// Database
const db = require('./models');


// Route
app.get('/v1', (req, res) => {
    res.send('Welcome to GA Space X API');
});

app.get('/v1/fetch-capsules', async (req, res) => {
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
        });
    }

    res.json(data);
});

app.get('/v1/fetch-capsules-again', async (req, res) => {
    const response = await axios.get('https://api.spacexdata.com/v4/capsules');
    const data = response.data; // array of objects [{}, {}, {}]

    const newCapsules = await data.map((capsuleObject) => {
        const { serial, type, water_landings } = capsuleObject; // destructuring
        const resultObj = {
            serial: serial,
            type: type,
            waterLandings: water_landings
        }
        return resultObj;
    });
    // res.json(newCapsules);
    // db.Capsule.collection.drop();
    // Add newCapsules to DB
    const allNewCapsules = await db.Capsule.create(newCapsules);
    res.json(allNewCapsules);
    // const allCapsules = await db.Capsule.find();
});

app.get('/v1/capsules', async (req, res) => {
    const fetchCapsules = await db.Capsule.find(); // array of objects
    res.json(fetchCapsules);
});

app.get('/v1/capsules/:serial', async (req, res) => {
    // let serial = req.params.serial;
    const { serial } = req.params;
    const fetchCapsule = await db.Capsule.find({ serial });
    res.json(fetchCapsule);
});

app.get('/v4/fetch-starlink', (req, res) => {
    const response = axios.get('https://api.spacexdata.com/v4/starlink');
    const data = response.data // pulling an array of objest from API

    for (let i = 0; i < data.length; i++) {
        let starlinkObject = data[i]; // object
        const { file, object_name, creation_date } = starlinkObject; // destructuring

        db.Capsule.create({
            file: file,
            objectName: object_name,
            creationDate: creation_date
        }, (err, newStarlink) => {
            console.log(newStarlink);
        });
    }
    
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

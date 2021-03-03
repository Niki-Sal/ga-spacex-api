const express = require('express');
const axios = require('axios');
// Set up App
const app = express();
const PORT = process.env.PORT || 8000;
// Database
const db = require('./models');
// Controllers
const crew_controller = require('./controllers/crew');
// Routes
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
            console.log("Error: ", err);
        });
    }
    res.json(data);
});
app.get('/v1/fetch-rockets', async (req, res) => {
    // Run axios
    const response = await axios.get('https://api.spacexdata.com/v4/rockets');
    const data = response.data; // array of objects [{}, {}, {}]
    // add each object info to DB
    for (let i = 0; i < data.length; i++) {
        let rocketObject = data[i]; // object
        const { name, stages, country, description } = rocketObject; // destructuring

        db.Rocket.create({
            name,
            stages,
            country,
            description,

        }, (err, newRocket) => {
            console.log(newRocket);
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

app.use("/v1/crew", crew_controller);

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
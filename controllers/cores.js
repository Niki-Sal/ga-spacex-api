const express = require('express');
const axios = require('axios');

// Set up App
const router = express.Router();



// Database
const db = require('../models');





router.get('/fetch-cores', async (req, res) => {
    // Run axios
    const response = await axios.get('https://api.spacexdata.com/v4/cores');
    const data = response.data; // array of objects [{}, {}, {}]
    // add each object info to DB
    for (let i = 0; i < data.length; i++) {
        let coreObject = data[i]; // object
        const { serial, status, last_update } = coreObject; // destructuring

        db.Core.create({
            serial: serial,
            status: status,
            lastUpdate: last_update
        }, (err, newCore) => {
            console.log(newCore);
        });
    }

    res.json(data);
});

router.get('/fetch-cores-again', async (req, res) => {
    const response = await axios.get('https://api.spacexdata.com/v4/cores');
    const data = response.data; // array of objects [{}, {}, {}]

    const newCores = await data.map((coreObject) => {
        const { serial, status, last_update } = coreObject; // destructuring
        const resultObj = {
            serial: serial,
            status: status,
            lastUpdate: last_update
        }
        return resultObj;
    });
    // res.json(newCapsules);
    // db.Capsule.collection.drop();
    // Add newCapsules to DB
    const allNewCores = await db.oree.create(newCores);
    res.json(allNewCores);
    // const allCapsules = await db.Capsule.find();
});

router.get('/', async (req, res) => {
    const fetchCores = await db.Cores.find(); // array of objects
    res.json(fetchCores);
});

router.get('/:serial', async (req, res) => {
    // let serial = req.params.serial;
    const { serial } = req.params;
    const fetchCore = await db.Core.find({ serial });
    res.json(fetchCore);
});


const express = require('express');
const axios = require('axios');

// Set up App
const app = express();
const PORT = process.env.PORT || 8000;

// Database
const db = require('./models');

// Route
app.get('/v1', (req, res) => {
    res.send({ greeting: 'Welcome to GA Space X API', author: 'Rome Bell' });
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

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

module.exports = server;
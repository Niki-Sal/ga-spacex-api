// Seed Database

const db = require('./models');

const addCapsules = async () => {
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
    // Add newCapsules to DB
    const allNewCapsules = await db.Capsule.create(newCapsules);
    res.json(allNewCapsules);
}

// run function
addCapsules();

// Do the same thing if you want to seed other collections (using models)
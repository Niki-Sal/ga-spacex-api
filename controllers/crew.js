const express = require("express");
const axios = require("axios");

// APP
// ---
const router = express.Router();

// DATABASE
// --------
const db  = require("../models");

// ROUTES
// ------

// ROUTE: Return Local Crew List
// -----------------------------
router.get('/', async (req, res) => {
  try {
    const fetchCrew = await db.Crew.find();
    res.json(fetchCrew);
  } catch (error) {
    console.error(error.message);
  }
});

// ROUTE: Fetch Remote Crew List
// -----------------------------
router.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/crew');
    const crews = await response.data; // array of objects [{}, {}, {}]
    let crewList = [];
    for (let crew of crews) {
      const { id, name, agency, image, wikipedia, status } = crew;
      const fields = {
        id: id,
        name: name,
        agency: agency,
        image: image,
        wikipedia: wikipedia,
        status: status
      };
      await db.Crew.findOneAndUpdate({id: id}, {...fields}, { new: true, upsert: true, overwrite: true });
      crewList = [fields, ...crewList];
    }
    res.json(crewList);  
  } catch (error) {
    console.error(error.message);
  }
});

// ROUTE: Destroy Crew Collection
// ------------------------------
router.get('/destroy', async (req, res) => {
  try {
    await db.Crew.collection.drop();
  } catch (error) {
    console.error(error.message);
  }
  res.send("Crew Collection Destroyed");
});

// ROUTE: Return a Specific Crew Member
// ------------------------------------
router.get('find/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fetchCrew = await db.Crew.find({ id });
    res.json(fetchCrew);
  } catch (error) {
    console.error(error.message)
  }
});

module.exports = router;
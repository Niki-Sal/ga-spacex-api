const db = require('../models');

const index = (req, res) => {
    // Purpose: Fetch all starlinks from DB and return
    console.log('=====> Inside GET /starlinks');

    db.Starlink.find({}, (err, foundStarlinks) => {
        if (err) console.log('Error in starlinks#index:', err);
        res.json(foundStarlinks);
    });
}

const show = (req, res) => {
    // Purpose: Fetch one starlink from DB and return
    console.log('=====> Inside GET /starlinks/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding starlink by id

    db.Starlink.findById(req.params.id, (err, foundStarlink) => {
        if (err) console.log('Error in starlinks#show:', err);
        res.json(foundStarlink);
    });
};

const create = (req, res) => {
    // Purpose: Create one starlink by adding body to DB, and return
    console.log('=====> Inside POST /starlinks');
    console.log('=====> req.body');
    console.log(req.body); // object used for creating new starlink

    db.Starlink.create(req.body, (err, savedStarlink) => {
        if (err) console.log('Error in starlinks#create:', err);
        res.json(savedStarlink);
    });
};

const update = (req, res) => {
    // Purpose: Update one Starlink in the DB, and return
    console.log('=====> Inside PUT /starlinks/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding starlink by id
    console.log('=====> req.body');
    console.log(req.body); // object used for updating starlink

    db.Starlink.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedStarlink) => {
        if (err) console.log('Error in starlinks#update:', err);
        res.json(updatedStarlink);
    });
};

const destroy = (req, res) => {
    // Purpose: Delete one starlink in the DB, and return
    console.log('=====> Inside DELETE /starlinks/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding starlink by id
    
    db.Starlink.findByIdAndDelete(req.params.id, (err, deletedStarlink) => {
        if (err) console.log('Error in starlinks#destroy:', err);
          res.sendStatus(200);
          console.log(deletedStarlink);
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
const db = require('../models');

const index = (req, res) => {
    // Purpose: Fetch all Capsules from DB and return
    console.log('=====> Inside GET /capsules');

    db.Capsule.find({}, (err, foundCapsules) => {
        if (err) console.log('Error in capsules#index:', err);
        res.json(foundCapsules);
    });
}

const show = (req, res) => {
    // Purpose: Fetch one Capsule from DB and return
    console.log('=====> Inside GET /capsules/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding Capsule by id

    db.Capsule.findById(req.params.id, (err, foundCapsule) => {
        if (err) console.log('Error in capsules#show:', err);
        res.json(foundCapsule);
    });
};

const create = (req, res) => {
    // Purpose: Create one Capsule by adding body to DB, and return
    console.log('=====> Inside POST /capsules');
    console.log('=====> req.body');
    console.log(req.body); // object used for creating new Capsule

    db.Capsule.create(req.body, (err, savedCapsule) => {
        if (err) console.log('Error in capsules#create:', err);
        res.json(savedCapsule);
    });
};

const update = (req, res) => {
    // Purpose: Update one Capsule in the DB, and return
    console.log('=====> Inside PUT /capsules/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding Capsule by id
    console.log('=====> req.body');
    console.log(req.body); // object used for updating Capsule

    db.Capsule.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCapsule) => {
        if (err) console.log('Error in capsules#update:', err);
        res.json(updatedCapsule);
    });
};

const destroy = (req, res) => {
    // Purpose: Delete one Capsule in the DB, and return
    console.log('=====> Inside DELETE /capsules/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding Capsule by id
    
    db.Capsule.findByIdAndDelete(req.params.id, (err, deletedCapsule) => {
        if (err) console.log('Error in capsules#destroy:', err);
          res.sendStatus(200);
          console.log(deletedCapsule);
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
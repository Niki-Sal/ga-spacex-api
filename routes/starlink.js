const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/', ctrl.starlink.index);
router.get('/:id', ctrl.starlink.show);
router.post('/', ctrl.starlink.create);
router.put('/:id', ctrl.starlink.update);
router.delete('/:id', ctrl.starlink.destroy);

// exports
module.exports = router;

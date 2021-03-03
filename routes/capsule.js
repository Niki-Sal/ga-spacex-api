const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/', ctrl.capsule.index);
router.get('/:id', ctrl.capsule.show);
router.post('/', ctrl.capsule.create);
router.put('/:id', ctrl.capsule.update);
router.delete('/:id', ctrl.capsule.destroy);

// exports
module.exports = router;

const express = require('express');
const bootcampController = require('../controllers/bootcampController');

const router = express.Router();  

router.route('/')
    .get(bootcampController.getBootcamps)
    .post(bootcampController.createBootcamp);

router.route('/:id')
    .get(bootcampController.getBootcamp)
    .put(bootcampController.updateBootcamp)
    .delete(bootcampController.deleteBootcamp);

router.route('/radius/:zipcode/:distance')
    .get(bootcampController.getBootcampsInRadius);  


module.exports = router;
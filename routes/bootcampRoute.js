const express = require('express');
const bootcampController = require('../controllers/bootcampController');
const Bootcamp = require('../models/bootcampModel');
const advancedResults = require('../middleware/advancedResults');

//Include other Resource Router
const courseRouter = require('./courseRoute');

const router = express.Router();  

//Re-route into other resource Router
router.use('/:bootcampId/courses', courseRouter);

router.route('/')
    .get(advancedResults(Bootcamp, 'courses'), bootcampController.getBootcamps)
    .post(bootcampController.createBootcamp);

router.route('/:id')
    .get(bootcampController.getBootcamp)
    .put(bootcampController.updateBootcamp)
    .delete(bootcampController.deleteBootcamp);

router.route('/radius/:zipcode/:distance')
    .get(bootcampController.getBootcampsInRadius);  

router.route('/:id/photo')
    .put(bootcampController.bootcampPhotoUpload);    


module.exports = router;
const express = require('express');
const bootcampController = require('../controllers/bootcampController');

//Include other Resource Router
const courseRouter = require('./courseRoute');

const router = express.Router();  

//Re-route into other resource Router
router.use('/:bootcampId/courses', courseRouter);

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
const express = require('express');
const courseController = require('../controllers/coursesController');

// if you want to access params from the parent router
const router = express.Router({ mergeParams : true });  

router.route('/')
    .get(courseController.getCourses);

module.exports = router;

const express = require('express');
const courseController = require('../controllers/coursesController');
const Courses = require('../models/courseModel');
const advancedResults = require('../middleware/advancedResults');
const auth = require('../middleware/auth');

// if you want to access params from the parent router
const router = express.Router({ mergeParams : true });  

router.route('/')
    .get(advancedResults(Courses, {
        path : 'bootcamp',
        select : 'name description'
    })
    , courseController.getCourses)
    .post(auth.protect, courseController.addCourse);

router.route('/:id')
    .get(courseController.getCourse) 
    .put(auth.protect, courseController.updateCourse)
    .delete(auth.protect, courseController.deleteCourse);

module.exports = router;

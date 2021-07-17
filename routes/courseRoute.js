const express = require('express');
const courseController = require('../controllers/coursesController');
const Courses = require('../models/courseModel');
const advancedResults = require('../middleware/advancedResults');

// if you want to access params from the parent router
const router = express.Router({ mergeParams : true });  

router.route('/')
    .get(advancedResults(Courses, {
        path : 'bootcamp',
        select : 'name description'
    })
    , courseController.getCourses)
    .post(courseController.addCourse);

router.route('/:id')
    .get(courseController.getCourse) 
    .put(courseController.updateCourse)
    .delete(courseController.deleteCourse);

module.exports = router;

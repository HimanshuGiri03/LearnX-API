const errorResponse = require('./../utils/errorResponse')
const bootcamp = require('../models/bootcampModel');
const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('../middleware/async')

//@desc   Get All Bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler (async (req, res, next) => {
    const allBootcamps = await bootcamp.find();
    res.status(200).json({ success : true, count : allBootcamps.length , data : allBootcamps });
});

//@desc   Get single Bootcamps
//@route  GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler (async (req, res, next) => {
    const SingleBootcamp = await bootcamp.findById(req.params.id);

    if(!SingleBootcamp){
        return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success : true, data : SingleBootcamp });

});

//@desc   Create new Bootcamp
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler( async (req, res, next) => {
    const newBootcamp = await bootcamp.create(req.body);
    res.status(201).json({ success : true, data : newBootcamp });
});

//@desc   Update Bootcamp
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
    const deletedBootcamp = await bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true
    });

    if(!deletedBootcamp){
        return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success : true, data : deletedBootcamp });
});

//@desc   Delete Bootcamp
//@route  POST /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
    const deletedBootcamp = await bootcamp.findByIdAndDelete(req.params.id);

    if(!deletedBootcamp){
        return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success : true, data :{} });
});


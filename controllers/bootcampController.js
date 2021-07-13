const bootcamp = require('../models/bootcampModel');
const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

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
    const deletedBootcamp = await bootcamp.findById(req.params.id);

    if(!deletedBootcamp){
        return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    deletedBootcamp.remove();

    res.status(200).json({ success : true, data :{} });
});

//@desc   Get Bootcamps within a radius
//@route  GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler( async (req, res, next) => {
    const { zipcode, distance} = req.params;

    //Get latitude and longitude from Geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const bootcamps = await bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});


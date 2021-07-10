const bootcamp = require('../models/bootcampModel');

//@desc   Get All Bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
    try{
        const allBootcamps = await bootcamp.find();
        res.status(200).json({ success : true, count : allBootcamps.length , data : allBootcamps });
    }
    catch(err) {
        res.status(400).json({success : false});
    }
}

//@desc   Get single Bootcamps
//@route  GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
    try{
        const SingleBootcamp = await bootcamp.findById(req.params.id);

        if(!SingleBootcamp){
            return  res.status(400).json({success : false});
        }

        res.status(200).json({ success : true, data : SingleBootcamp });
    }
    catch(err) {
        res.status(400).json({success : false});
    }
}

//@desc   Create new Bootcamp
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = async (req, res, next) => {
    try{
        const newBootcamp = await bootcamp.create(req.body);
        res.status(201).json({ success : true, data : newBootcamp });
    }
    catch(err) {
        res.status(400).json({success : false});
    }
}

//@desc   Update Bootcamp
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const deletedBootcamp = await bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        });

        if(!deletedBootcamp){
            return  res.status(400).json({success : false});
        }

        res.status(200).json({ success : true, data : deletedBootcamp });
        
    } catch (err) {
        res.status(400).json({success : false});
    }
}

//@desc   Delete Bootcamp
//@route  POST /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const deletedBootcamp = await bootcamp.findByIdAndDelete(req.params.id);

        if(!deletedBootcamp){
            return  res.status(400).json({success : false});
        }

        res.status(200).json({ success : true, data :{} });
        
    } catch (err) {
        res.status(400).json({success : false});
    }
}


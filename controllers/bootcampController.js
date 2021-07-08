//@desc   Get All Bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success : 'success', msg : 'Show all Bootcamps' });
}

//@desc   Get single Bootcamps
//@route  GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success : 'success', msg : `Show bootcamp ${req.params.id}` });
}

//@desc   Create new Bootcamp
//@route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success : 'success', msg : 'Create Bootcamp' });
}

//@desc   Update Bootcamp
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success : 'success', msg : `Update bootcamp ${req.params.id}` });
}

//@desc   Delete Bootcamp
//@route  POST /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success : 'success', msg : `Delete bootcamp ${req.params.id}` });
}


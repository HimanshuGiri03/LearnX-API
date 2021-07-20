const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/userModel');

//@desc   Register User
//@route  POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role : req.body.role
    });
    
    sendTokenResponse(newUser, 200, res);
});

//@desc   Login User
//@route  POST /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {

    const {email, password} = req.body;

    //validate email and password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    //Check for user
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    //check if password is correct
    const isCorrect = await user.matchPassword(password);

    if(!isCorrect){
        return next(new ErrorResponse('Invalid Credentials', 401));   
    }
    
   sendTokenResponse(user, 200, res);
});

//Get Token form model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

     //create token 
    const token = user.getSignedJwtToken();

    const options = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly : true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    res.status(statusCode)
       .cookie('token', token, options)
       .json({
           success : true,
           token
       })
};

//@desc   Get Current Logged In User
//@route  POST /api/v1/auth/me
//@access Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({success : true, data : user});
});
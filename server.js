const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');

//Load env vars 
dotenv.config({ path : './config/config.env'});

//Connect to Database
connectDB();

//Route files 
const bootcamps = require('./routes/bootcampRoute');
const courses = require('./routes/courseRoute');
const auth = require('./routes/auth');

const app = express();

//Body-Parser
app.use(express.json());

//cookie-parser
app.use(cookieParser());

//Dev logging Middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//uploading file
app.use(fileupload());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount Router
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Unhandled Promise Rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    //Close Server and Exit Process
    server.close(() => { process.exit(1)} );
});
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//Load env vars 
dotenv.config({ path : './config/config.env'});

//Connect to Database
connectDB();

//Route files 
const bootcamps = require('./routes/bootcampRoute');

const app = express();

//Dev logging Middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Mount Router
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Unhandled Promise Rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    //Close Server and Exit Process
    server.close(() => { process.exit(1)} );
});
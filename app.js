require('dotenv').config();
require('express-async-errors');
const express= require('express');
const port = process.env.PORT || 3000;
const connectDB = require('./db/connection');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const authentication = require('./middleware/authentication');
const authRoute = require('./route/authRoute');
const jobRoute = require('./route/jobRoute');
//security package
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/job',authentication ,jobRoute);

app.use(notFound);
app.use(errorHandler);
app.use(helmet());
app.use(xss());
app.use(cors());
app.set('trust proxy', 1);
app.use(rateLimit({
    windowMs : 15 * 60 * 100, //15 minutes
    max: 100, //limit each ip requests per windowMs
}));

const start = async ()=> {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Port is set on ${port}`));
    }catch(error){
        console.log(error);
    }
}
start();

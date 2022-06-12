const mongoose = require('mongoose');

const connectDB = async (url)=>{
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('DB Connected')
    }).catch((error)=>{
        console.log(error);
    });
}

module.exports = connectDB;
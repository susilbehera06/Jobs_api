const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, "Please provide company name"],
        maxlength:50
    },
    position:{
        type:String,
        required:[true, "Please provide position name"],
        maxlength:100
    },
    status:{
        type:String,
        enum:['Interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide User']
    }
},{timestamps:true});

module.exports = mongoose.model('Job',jobSchema);
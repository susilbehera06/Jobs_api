require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
        minlength:3,
        maxlength : 50
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        match:[
            /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,'Please provide valid Email'
        ],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minlength: 6
    }
});

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id,name:this.name},'jwtSecret',{expiresIn:'30d'});
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}


module.exports = mongoose.model('User',userSchema);
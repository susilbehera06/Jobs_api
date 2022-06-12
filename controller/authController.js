const {StatusCodes} = require('http-status-codes');
const User = require('../model/userModel');
const {BadRequest, Unauthenticate} = require('../errors');
const register = async (req, res)=>{
    const user = await User.create({...req.body});
    const token = user.createJWT();
     res.status(StatusCodes.CREATED).json({user:{name:user.name}, token});
}

const login = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequest('Please provide email or password');
    }

    const user = await User.findOne({email});
    if(!user){
        throw new Unauthenticate('Invalid email or password');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new Unauthenticate('Invalid email or password');
    }
    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({user: {name:user.name}, token});
}

module.exports = {
    register,login
}
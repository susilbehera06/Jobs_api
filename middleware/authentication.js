const jwt = require('jsonwebtoken');
const {Unauthenticate} = require('../errors');
const userModel = require('../model/userModel');

const auth = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Unauthenticate("Authentication Invalid");
    }
    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token,'jwtSecret');
        req.user = {userId:payload.userId, name:payload.name};
        next();
    }catch(error){
       throw new Unauthenticate('Authentication Invalid');
    }
}

module.exports = auth;
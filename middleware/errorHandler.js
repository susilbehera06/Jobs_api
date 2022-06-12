const CustomApiError = require('../errors/custom-error');
const {StatusCodes} = require('http-status-codes');

const errorHandler=  (err, req, res, next)=> {
    // console.log(err);
    let customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong , try again'
    }

    if(err.name == 'ValidationError'){
        customError.msg = Object.values(err.errors).map(item => item.message).join(',');
        customError.statusCode = 400;
    }

    if(err.code && err.code === 11000){
        customError.msg  = `Duplicate value entered for ${err.keyValue} field, Please choose another value`;
        customError.statusCode = 400;
    }

    if(err.name === 'CastError'){
        customError.msg = `No item found with id ${err.value}`;
        customError.statusCode = 404;
    }

//    if(err instanceof CustomApiError){
//        return res.status(err.statusCode).json({msg: err.message});
//    }
//    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
    return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandler;
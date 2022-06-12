const { BadRequest , notFound} = require("../errors");
const {StatusCodes} = require('http-status-codes');
const Job = require('../model/jobModel');

const getAlljob = async (req, res)=>{
    const job = await Job.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({job, count:job.length});
}
const createJob = async (req, res)=>{
    // res.json(req.user);
    const {company, position} = req.body;
    if(!company || !position){
        throw new BadRequest('Please provide Company and Position');
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}
const getSingleJob = async (req, res)=>{
    const {user:{userId},params:{id:jobId}} = req;
    const job = await Job.findOne({
        _id: jobId, createdBy:userId
    });
    if(!job){
        throw new notFound(`No jobs with id: ${jobId}`);
    }
    res.status(StatusCodes.OK).json({job});
}
const updateJob = async (req, res)=>{
    const {body:{company, position},user:{userId},params:{id:jobId}} = req;
    if(company === '' || position === ''){
        throw new BadRequest('Company or position can not be empty');
    }
    const job = await Job.findOneAndUpdate({
        _id:jobId,
        createdBy:userId 
    },req.body,{new:true, runValidators:true});
    if(!job){
        throw new notFound(`No job with this id: ${jobId}`);
    }
    res.status(StatusCodes.OK).json({job});
}
const deleteJob = async (req, res)=>{
   const {user:{userId}, params:{id:jobId}} = req;
   const job = await Job.findOneAndRemove({
       _id:jobId,
       createdBy:userId
   });
   if(!job){
       throw new notFound(`No job  with this id: ${jobId}`);
   }
   res.status(StatusCodes.OK).json({job});
}

module.exports = {
    getAlljob,createJob,getSingleJob,updateJob,deleteJob
}
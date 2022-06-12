const express =  require('express');
const router = express.Router();
const {getAlljob,createJob,getSingleJob,updateJob,deleteJob} = require('../controller/jobController');

router.route('/').get(getAlljob).post(createJob);
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob);

module.exports = router;
const notFound = async (req, res)=>{
    return res.status(404).json({msg:'No Route found'});
}
module.exports = notFound;
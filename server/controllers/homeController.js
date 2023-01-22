exports.home = (req,res)=>{
    res.status(200).json({
        status:true,
        greeting:"hello from API"
    })
}
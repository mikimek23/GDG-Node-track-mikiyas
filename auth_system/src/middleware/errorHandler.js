export const errorHandler = async(err, req, res, next)=>{
    const error ={...err}
    error.message = err.message
    console.log(error.message)
    res.status(error.statusCode || 500).json({
        success:false,
        message: error.message
    })
}
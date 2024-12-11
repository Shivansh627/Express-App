const { Validation_error, Not_Found, Forbidden, unauthorized, Server } = require("../constants");

const errorHandler= (error,req,res,next)=>{
    const statusCode= res.statusCode ? res.statusCode:500;
    switch (statusCode) {
        case Validation_error:
            res.json({title:"Validation Error",message: error.message});
            break;
        
        case Not_Found:
            res.json({title:"not found",message: error.message});
            break;
            
        case Forbidden:
            res.json({title:"Forbidden",message: error.message});
            break;

        case unauthorized:
            res.json({title:"not found",message: error.message});
            break;

        case Server:
            res.json({title:"Server error",message: error.message});
            break;
        default:
            res.json({title:"uncaught",message: error.message})
            break;
    }
}
module.exports= errorHandler;
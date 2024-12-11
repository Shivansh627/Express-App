const asynchandler= require("express-async-handler")

//@desc Register the user
//@route Post /api/users/register
//@access public

const registerUser = asynchandler(async (req,res)=>{
    res.json({message :"register the user"})
});

//@desc login the user
//@route Post /api/users/login
//@access public

const loginUser = asynchandler(async (req,res)=>{
    res.json({message :"login the user"})
});

//@desc Current user info
//@route Get /api/users/current
//@access public

const currentUser = asynchandler(async (req,res)=>{
    res.json({message :"current user info"})
});

module.exports= {
    registerUser,
    loginUser,
    currentUser
};
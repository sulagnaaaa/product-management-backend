const express=require("express")

const{
    // getUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
}=require("../controller/user.controller");

const router=express.Router()

// router.get("/",getUser)
router.post("/signup",createUser)
router.post("/login",loginUser);

module.exports=router;
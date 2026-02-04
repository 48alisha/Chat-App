import express from "express";
import { signup,login,logout,updateprofile } from "../controllers/auth.controller.js";
import { protectroute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",login) ;

router.get("/logout", logout);
router.put("/update-profile", protectroute, updateprofile);

router.get("/check", protectroute,(req,res)=>{
    res.status(200).json(req.user);
})

export default router;

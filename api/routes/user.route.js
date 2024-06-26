import express from "express";
import { test ,updateUser,user} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyuser.js";
const router=express.Router();
router.get("/test",test);

router.get("/user",user)
router.post("/update/:id",verifyToken,updateUser)
export default router
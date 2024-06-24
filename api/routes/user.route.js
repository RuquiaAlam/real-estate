import express from "express";
import { test ,user} from "../controllers/user.controller.js";
const router=express.Router();
router.get("/test",test);

router.get("/user",user)
export default router
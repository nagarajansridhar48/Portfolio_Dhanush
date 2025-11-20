import express from "express";
import sendMessage  from "../controllers/contactController.js";
import messageModel from "../models/messageModel.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get('/getmessage',async(_,res)=>{
    const data = await messageModel.find();
    res.json(data);
});

export default router;
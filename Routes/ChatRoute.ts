const express = require("express")
const router = express.Router()
const {
    createChat, finduserChats, findChat
  } = require("../Controller/chatController.ts");

router.post("/createchat", createChat);
router.get("/:userId", finduserChats);
router.get("/find/:firstId/:secondId", findChat);


module.exports = router

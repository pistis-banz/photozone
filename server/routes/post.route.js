const express = require("express");
const router = express.Router();
const { 
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller.js");
const multer = require("multer");

router.get("/", async (req, res) => {});

router.post("/createPost", upload.single("postImage"), createPost);
router.post("/getPost/:id",getAvatar);
router.put("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);

module.exports = router;
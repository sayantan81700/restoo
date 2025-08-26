import express from "express";
import { protect } from "../middleware/auth.js";
import { uploadSingle, handleUploadError } from "../middleware/upload.js";

const router = express.Router();

router.post("/image", protect, uploadSingle, handleUploadError, (req, res) => {
  res.json({ url: req.file?.path, public_id: req.file?.filename });
});

export default router;

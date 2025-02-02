const express = require('express');
const multer = require('multer');
const path = require('path');
const Tesseract = require('tesseract.js');

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload & OCR Route
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const { data: { text } } = await Tesseract.recognize(req.file.path, 'eng');
    res.json({ imageUrl: `/uploads/${req.file.filename}`, extractedText: text });
  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

module.exports = router;
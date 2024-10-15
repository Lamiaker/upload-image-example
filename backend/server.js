const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS middleware
app.use(cors({
    origin: 'http://localhost:5174',
}));

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Save uploaded files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename the file with a timestamp
    }
});

// Initialize multer upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (5 MB)
    fileFilter: (req, file, cb) => {
        // Allow only image files
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
}).single('photo');

// Create an upload route
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        res.send({ message: 'File uploaded successfully!', file: req.file });
    });
});

// Start the server
app.listen(4000, () => {
    console.log('Server started on http://localhost:4000');
});

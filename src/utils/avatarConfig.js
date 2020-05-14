const multer = require('multer');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, `public/${req.user._id}/avatar`);
    },
    filename: (req, file, cb) =>{
        const filename = `${Date.now()}${file.originalname}`;
        req.filename = filename;
        cb(null, `${filename}`);
    }
});
const avatarConfig = multer({storage:storageConfig}).single("file");

module.exports = avatarConfig;
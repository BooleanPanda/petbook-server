const multer = require('multer');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, `public/${req.user._id}/albums/${req.params.id}`);
    },
    filename: (req, file, cb) =>{
        const filename = `${Date.now()}${file.originalname}`;
        req.filenames.push(filename);
        cb(null, `${filename}`);
    }
});
const avatarConfig = multer({storage:storageConfig}).array("files");

module.exports = avatarConfig;
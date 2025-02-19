import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import ApiError from "../Utils/ApiError.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Set storage engine
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         let extention = path.extname(file.originalname)
//         cb(null, `${Date.now()}${extention}`);
//     },
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg" , "image/gif"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only images are allowed"), false);
//     }
// };

// // Upload middleware
// const upload = multer({
//     storage,
//     limits: { fileSize: 20 * 1024 * 1024 },
//     fileFilter,
// });

// export default upload;



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        let extension = path.extname(file.originalname);  
        cb(null, `${Date.now()}${extension}`);
    },
});

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
//     const videoTypes = ["video/mp4", "video/mkv", "video/webm", "video/avi"];
  
//     // if (allowedTypes.includes(file.mimetype)) {
//     //     cb(null, true); 
//     // } else {
//     //     cb(new Error("Only images and video are allowed"), false); 
//     // }
//     if (file.fieldname === "homeHeroURL") {
//         if (!videoTypes.includes(file.mimetype)) {
//             return cb(new Error("Only videos are allowed for homeHeroURL"), false);
//         }
//     } else {
//         if (!allowedTypes.includes(file.mimetype)) {
//             return cb(new Error(`Only images are allowed for ${file.fieldname}`), false);
//         }
//     }
// };

const fileFilter = (req, file, cb) => {

    const imageTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    const videoTypes = ["video/mp4", "video/mkv", "video/webm", "video/avi"];

    if (file.fieldname === "homeHeroURL") {
        if (!videoTypes.includes(file.mimetype)) {
            return cb(new ApiError(`just video ${file.fieldname}`, 400), false); 
        }
    } else {
        if (!imageTypes.includes(file.mimetype)) {
            return cb(new ApiError(`just image ${file.fieldname}`, 400), false); 
         }
    }

    cb(null, true); 
};




const upload = multer({
    storage,  
     limits: { fileSize: 100 * 1024 * 1024 }, 
    fileFilter, 
});

export default upload;

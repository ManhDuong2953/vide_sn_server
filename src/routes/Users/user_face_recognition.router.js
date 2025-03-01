import { Router } from 'express';
import { createUserFaceData, deleteUserFaceData, getAllUserFaceDataByUserIDEncode, getUserFaceDataById, loginUserFaceData } from '../../controllers/Users/user_face_recognition.controller.js';
import multer from 'multer';
import Authentication from '../../middlewares/authentication/authentication_token.js';
import { Authorization } from '../../middlewares/authorization/authorization_token.js';

// Set up storage (in-memory storage or disk storage based on your needs)
const storage = multer.memoryStorage(); // You can switch to multer.diskStorage() if needed
const upload = multer({ storage });

// Configure router
const UserFaceRecognitionRouter = (router = Router()) => {
    router.post('/login-face-recognition', Authentication, Authorization, loginUserFaceData);
    // Handle multiple images with field name 'images_face_recognition'
    router.post('/create-face-recognition/', upload.fields([
        { name: 'images_face_recognition', maxCount: 10 }
    ]),Authentication, Authorization, createUserFaceData);
    router.get('/get-face-recognition/',Authentication, Authorization, getUserFaceDataById);
    router.post('/get-all-face-recognition-by-id', getAllUserFaceDataByUserIDEncode);
    router.delete('/delete-face-recognition/',Authentication, Authorization, deleteUserFaceData);

    return router;
};

export default UserFaceRecognitionRouter;

import { Router } from 'express';
import { createUserFaceData, deleteUserFaceData, getAllUserFaceData, getUserFaceDataById, loginUserFaceData } from '../../controllers/Users/user_face_recognition.controller';
import multer from 'multer';
import Authentication from '../../middlewares/authentication/authentication_token';
import { Authorization } from '../../middlewares/authorization/authorization_token';

// Set up storage (in-memory storage or disk storage based on your needs)
const storage = multer.memoryStorage(); // You can switch to multer.diskStorage() if needed
const upload = multer({ storage });

// Configure router
const UserFaceRecognitionRouter = (router = Router()) => {
    router.post('/login-face-recognition', Authentication, Authorization, loginUserFaceData);
    // Handle multiple images with field name 'images_face_recognition'
    router.post('/create-face-recognition/:id', upload.fields([
        { name: 'images_face_recognition', maxCount: 10 }
    ]), createUserFaceData);
    router.get('/get-face-recognition/:id', getUserFaceDataById);
    router.get('/get-all-face-recognition', getAllUserFaceData);
    router.delete('/delete-face-recognition/:id', deleteUserFaceData);

    return router;
};

export default UserFaceRecognitionRouter;

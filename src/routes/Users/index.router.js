import { Router } from 'express';
import UserAccountRouter from './user_account.router';
import express from 'express';
import Authentication from '../../middlewares/authentication/authentication_token';
import { Authorization } from '../../middlewares/authorization/authorization_token';
import { getInfoProfileUser, uploadInfoProfileUser } from '../../controllers/Users/index.controller';

import multer from 'multer';
import UserSettingRouter from './user_setting.router';
import UserFaceRecognitionRouter from './user_face_recognition.router';
// Cấu hình Multer để xử lý nhiều trường ảnh
const storage = multer.memoryStorage(); // Bạn có thể thay đổi sang multer.diskStorage() nếu cần
const upload = multer({ storage });

const UserRouter = (router = Router()) => {
    router.use("/account", UserAccountRouter(express.Router()));
    router.use("/face-recognition", UserFaceRecognitionRouter(express.Router()));
    router.use("/setting", UserSettingRouter(express.Router()));
    router.get('/info-profile/:id', Authentication, Authorization, getInfoProfileUser);
    router.get('/info-profile/', Authentication, Authorization, getInfoProfileUser);
    router.put('/update-profile/:id', Authentication, Authorization, upload.fields([
        { name: 'avatar', maxCount: 1 }, 
        { name: 'cover', maxCount: 1 }
    ]), uploadInfoProfileUser);
    return router;
};

export default UserRouter;
